// Componente Server para renderizar conteúdo crítico no HTML inicial
export default function ServerContent() {
  return (
    <div className="seo-content" style={{
      position: 'absolute',
      left: '-9999px',
      top: '-9999px',
      width: '1px',
      height: '1px',
      overflow: 'hidden'
    }}>
      <h1>Brunch Experience - O Futuro Agora da Experiência do Cliente</h1>
      <p>Um encontro exclusivo para líderes durante o Startup Summit 2025</p>
      
      <div>
        <p>Data: 28 de agosto de 2025</p>
        <p>Horário: 09h às 12h</p>
        <p>Local: Blackpot Floripa, Florianópolis - SC</p>
      </div>
      
      <div>
        <h2>Palestrantes Confirmados:</h2>
        <p>David Ledson - Fundador da Opens</p>
        <p>Bento Meirelles - Founder da Minimal</p>
        <p>Douglas Conrad - Empreendedor e Investidor</p>
        <p>Guilherme Ferreira - CEO da Atomsix</p>
        <p>Marcela Zaidem - Fundadora CNP | Ex-G4 Educação</p>
        <p>Dionara Conrad - CEO Opens e mestre de cerimônia</p>
        <p>João Paulo - CSO da Nextar</p>
        <p>Aline Simões - Especialista em Marketing Digital</p>
        <p>Leonardo Superti - CEO da CustomerX</p>
        <p>Veridiana Santos - Consultora em Experiência do Cliente</p>
      </div>
      
      <div>
        <h2>Sobre o Evento:</h2>
        <p>Este não é um evento para todos. É uma experiência exclusiva, pensada para líderes que entendem que o futuro dos negócios está na experiência do cliente.</p>
        <p>Vagas limitadas. Apenas por convite.</p>
        
        <h3>Características do evento:</h3>
        <ul>
          <li>Exclusivo - Mais que networking, uma experiência curada para conexões humanas</li>
          <li>Apenas por Convite - Acesso restrito a empreendedores e líderes selecionados</li>
          <li>Networking de Alto Nível - Conexões estratégicas com quem realmente importa</li>
          <li>Experiência Premium - Ambiente exclusivo no melhor restaurante de Floripa</li>
          <li>Conteúdo Exclusivo - Insights e estratégias compartilhadas apenas entre nós</li>
        </ul>
      </div>
      
      <div>
        <h2>Organização:</h2>
        <p>Evento organizado pela Opens durante o Startup Summit 2025</p>
        <p>Para mais informações: <a href="/brunch-vip.txt">Versão texto</a> | <a href="/brunch-vip.json">Dados JSON</a></p>
      </div>
    </div>
  )
}