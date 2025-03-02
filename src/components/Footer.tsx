import { Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Fale conosco</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>(35) 3441-0000</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <a href="mailto:contact@santarita.church">contact@santarita.br</a>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Rua Santa Rita, 81, Ouro Fino, Minas Gerais, 37570-000</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Horário da Missa</h3>
            <ul className="space-y-2">
              <li>Domingo: 10:00 h</li>
              <li>Dia 22 de cada mês: 19:00 h</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Siga-nos</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/vivaourofino/videos/%EF%B8%8F-igreja-de-santa-rita-de-c%C3%A1ssia-ouro-fino-mg-santa-rita-advogada-dos-imposs%C3%ADvei/186636910000005/" target='_blanck'  className="hover:text-blue-500">Facebook</a>
              <a href="#" className="hover:text-blue-500">Instagram</a>
              <a href="#" className="hover:text-blue-500">YouTube</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
  <p>
    {new Date().getFullYear()} &copy; Igreja Santa Rita de Cássia.<br />
    Todos os direitos reservados.<br />
    <span className="inline-flex items-center justify-center gap-1">
      Desenvolvido com 
      <Heart className="h-4 w-4 mx-1.5 inline-block align-middle hover:fill-red-600 cursor-pointer transition-color duration-300" /> 
      por MR Campos
    </span>
  </p>
</div>
      </div>
    </footer>
  );
};

export default Footer;