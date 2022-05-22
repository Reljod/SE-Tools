import { useRouter } from 'next/router'
import { getLastPathFromUrl, capitalizeFirstLetter } from 'lib/helpers'

const useRouterCustom = (): any => {
  const router: any = useRouter();
  const currentRoute = getLastPathFromUrl(router.asPath)
  
  return {
    ...router,
    routeTitle: capitalizeFirstLetter(currentRoute)
  }
}

export {
  useRouterCustom
}