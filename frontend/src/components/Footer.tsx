import { Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-ink text-parchment-dim border-t border-gold/40">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-lg font-semibold text-parchment mb-4">Fale conosco</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gold" strokeWidth={1.5} />
                <span>(35) 3441-0000</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-gold" strokeWidth={1.5} />
                <a href="mailto:contact@santarita.church" className="hover:text-gold">contact@santarita.br</a>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-gold" strokeWidth={1.5} />
                <span>Rua Santa Rita, 81, Ouro Fino, Minas Gerais, 37570-000</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold text-parchment mb-4">Horário da Missa</h3>
            <ul className="space-y-2 text-sm">
              <li>Domingo: 10:00 h</li>
              <li>Dia 22 de cada mês: 19:00 h</li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold text-parchment mb-4">Siga-nos</h3>
            <div className="flex flex-col space-y-2 text-sm">
              <a href="https://www.facebook.com/vivaourofino/videos/%EF%B8%8F-igreja-de-santa-rita-de-c%C3%A1ssia-ouro-fino-mg-santa-rita-advogada-dos-imposs%C3%ADvei/186636910000005/" target='_blank' rel="noreferrer" className="hover:text-gold">Facebook</a>
              <a href="https://www.instagram.com/explore/locations/71564550/paroquia-de-santo-antonio/" target='_blank' rel="noreferrer" className="hover:text-gold">Instagram</a>
              <a href="https://www.youtube.com/channel/UC1X_WleWvbN2O8EryCqXaug" target='_blank' rel="noreferrer" className="hover:text-gold">YouTube</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-ink-soft/40 text-center text-sm">
          <p>
            {new Date().getFullYear()} &copy; Igreja Santa Rita de Cássia.<br />
            Todos os direitos reservados.<br />
            <span className="inline-flex items-center justify-center gap-1">
              Desenvolvido com
              <Heart className="h-4 w-4 mx-1.5 inline-block align-middle hover:fill-wine cursor-pointer transition-colors duration-300" strokeWidth={1.5} />
              por MR Campos
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
