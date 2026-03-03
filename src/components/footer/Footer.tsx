import { FacebookLogo, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react"

function Footer() {
  return (
    <>
    {/* bg-background traz o fundo preto e border-border traz a linha cinza */}
    <footer className="w-full border-t border-border bg-background py-8">
      <div className="container mx-auto flex flex-col items-center justify-center gap-4 px-4">
        
        {/* Textos */}
        <div className="text-center">
          <p className="text-lg font-bold text-foreground tracking-tight">
            FitTrack | Copyright © 2026
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Acesse nossas redes sociais
          </p>
        </div>
        
        {/* Ícones com efeito hover para o verde principal (primary) */}
        <div className="flex gap-5 mt-2">
          <a 
            href="#" 
            aria-label="LinkedIn" 
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <LinkedinLogo size={32} weight="regular" />
          </a>
          <a 
            href="#" 
            aria-label="Instagram" 
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <InstagramLogo size={32} weight="regular" />
          </a>
          <a 
            href="#" 
            aria-label="Facebook" 
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            <FacebookLogo size={32} weight="regular" />
          </a>
        </div>

      </div>
    </footer>
    </>
  )
}

export default Footer