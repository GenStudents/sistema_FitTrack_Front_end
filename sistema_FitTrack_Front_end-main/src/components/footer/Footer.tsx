import { FacebookLogoIcon, InstagramLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react"

function Footer() {

return (
<>
<div className="flex justify-center bg-indigo-900 text-white">
<div className="container flex flex-col items-center py-4">
<p className='text-x1 font-bold'>
FitTrack | Copyright: 2026
</p>
<p className='text-1g'>Acesse nossas redes sociais</p>
<div className='flex gap-2'>
<LinkedinLogoIcon size={48} weight='bold' />
<InstagramLogoIcon size={48} weight='bold' />
<FacebookLogoIcon size={48} weight='bold' />
</div>
</div>
</div>
</>
)
}


export default Footer