import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'
import { CategoryType } from '@prisma/client'

// GET /api/categories - Listar categorias
export async function getCategories(req: Request, res: Response) {
  try {
    const { type } = req.query

    const where: any = {}
    
    if (type) {
      where.type = type as CategoryType
    }

    const categories = await prisma.category.findMany({
      where,
      orderBy: {
        name: 'asc'
      }
    })

    res.json(categories)
  } catch (error) {
    console.error('Erro ao buscar categorias:', error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

// GET /api/categories/:id - Obter categoria específica
export async function getCategoryById(req: Request, res: Response) {
  try {
    const { id } = req.params

    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        events: {
          where: {
            isActive: true,
            date: {
              gte: new Date()
            }
          },
          orderBy: {
            date: 'asc'
          }
        },
        news: {
          where: {
            isPublished: true
          },
          orderBy: {
            publishedAt: 'desc'
          }
        }
      }
    })

    if (!category) {
      return res.status(404).json({ error: 'Categoria não encontrada' })
    }

    res.json(category)
  } catch (error) {
    console.error('Erro ao buscar categoria:', error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

// POST /api/categories - Criar categoria
export async function createCategory(req: Request, res: Response) {
  try {
    const { name, description, type } = req.body

    // Validações básicas
    if (!name || !type) {
      return res.status(400).json({
        error: 'Campos obrigatórios: name, type'
      })
    }

    if (!Object.values(CategoryType).includes(type)) {
      return res.status(400).json({
        error: 'Tipo de categoria inválido. Use: EVENT ou NEWS'
      })
    }

    const category = await prisma.category.create({
      data: {
        name,
        description,
        type
      }
    })

    res.status(201).json(category)
  } catch (error) {
    console.error('Erro ao criar categoria:', error)
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Categoria com este nome já existe' })
    }
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

// PUT /api/categories/:id - Atualizar categoria
export async function updateCategory(req: Request, res: Response) {
  try {
    const { id } = req.params
    const { name, description, type } = req.body

    if (type && !Object.values(CategoryType).includes(type)) {
      return res.status(400).json({
        error: 'Tipo de categoria inválido. Use: EVENT ou NEWS'
      })
    }

    const category = await prisma.category.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(type && { type })
      }
    })

    res.json(category)
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error)
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Categoria não encontrada' })
    }
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Categoria com este nome já existe' })
    }
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

// DELETE /api/categories/:id - Deletar categoria
export async function deleteCategory(req: Request, res: Response) {
  try {
    const { id } = req.params

    // Verificar se existem eventos ou notícias usando esta categoria
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        events: true,
        news: true
      }
    })

    if (!category) {
      return res.status(404).json({ error: 'Categoria não encontrada' })
    }

    if (category.events.length > 0 || category.news.length > 0) {
      return res.status(400).json({
        error: 'Não é possível deletar categoria que possui eventos ou notícias associadas'
      })
    }

    await prisma.category.delete({
      where: { id }
    })

    res.status(204).send()
  } catch (error) {
    console.error('Erro ao deletar categoria:', error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}