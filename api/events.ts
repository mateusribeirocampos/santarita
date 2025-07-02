import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'

// GET /api/events - Listar eventos
export async function getEvents(req: Request, res: Response) {
  try {
    const { category, type, active = 'true' } = req.query

    const where: any = {}
    
    if (active === 'true') {
      where.isActive = true
    }

    if (category) {
      where.category = {
        name: category as string
      }
    }

    if (type) {
      where.type = type as string
    }

    // Apenas eventos futuros por padrão
    where.date = {
      gte: new Date()
    }

    const events = await prisma.event.findMany({
      where,
      include: {
        category: true
      },
      orderBy: {
        date: 'asc'
      }
    })

    res.json(events)
  } catch (error) {
    console.error('Erro ao buscar eventos:', error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

// GET /api/events/:id - Obter evento específico
export async function getEventById(req: Request, res: Response) {
  try {
    const { id } = req.params

    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        category: true
      }
    })

    if (!event) {
      return res.status(404).json({ error: 'Evento não encontrado' })
    }

    res.json(event)
  } catch (error) {
    console.error('Erro ao buscar evento:', error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

// POST /api/events - Criar evento
export async function createEvent(req: Request, res: Response) {
  try {
    const {
      title,
      description,
      fullDescription,
      date,
      time,
      location,
      image,
      type,
      categoryId
    } = req.body

    // Validações básicas
    if (!title || !description || !date || !time || !categoryId) {
      return res.status(400).json({
        error: 'Campos obrigatórios: title, description, date, time, categoryId'
      })
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        fullDescription,
        date: new Date(date),
        time,
        location,
        image,
        type,
        categoryId
      },
      include: {
        category: true
      }
    })

    res.status(201).json(event)
  } catch (error) {
    console.error('Erro ao criar evento:', error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

// PUT /api/events/:id - Atualizar evento
export async function updateEvent(req: Request, res: Response) {
  try {
    const { id } = req.params
    const {
      title,
      description,
      fullDescription,
      date,
      time,
      location,
      image,
      type,
      categoryId,
      isActive
    } = req.body

    const event = await prisma.event.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(fullDescription !== undefined && { fullDescription }),
        ...(date && { date: new Date(date) }),
        ...(time && { time }),
        ...(location !== undefined && { location }),
        ...(image !== undefined && { image }),
        ...(type && { type }),
        ...(categoryId && { categoryId }),
        ...(isActive !== undefined && { isActive })
      },
      include: {
        category: true
      }
    })

    res.json(event)
  } catch (error) {
    console.error('Erro ao atualizar evento:', error)
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Evento não encontrado' })
    }
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

// DELETE /api/events/:id - Deletar evento (soft delete)
export async function deleteEvent(req: Request, res: Response) {
  try {
    const { id } = req.params

    await prisma.event.update({
      where: { id },
      data: {
        isActive: false
      }
    })

    res.status(204).send()
  } catch (error) {
    console.error('Erro ao deletar evento:', error)
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Evento não encontrado' })
    }
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}