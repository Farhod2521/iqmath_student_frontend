export const openAuthWithReturn = (router, returnUrl, tab = 'signUp') => {
  router.replace(
    {
      pathname: router.pathname,
      query: { ...router.query, tab, returnUrl }
    },
    undefined,
    { shallow: true }
  )
}

export const closeAuthModal = (router) => {
  const nextQuery = { ...router.query }
  delete nextQuery.tab
  delete nextQuery.returnUrl

  router.replace({ pathname: router.pathname, query: nextQuery }, undefined, { shallow: true })
}
