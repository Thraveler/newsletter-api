const addUnsubscribeContent = (content: string, newsletterId: number) => {
  const unsubscribeUrl = `<a href="http://localhost:80/unsubscribe/${newsletterId}">Unsubscribe</a>`
  return `
    ${content}
    ${unsubscribeUrl}  
  `
}

export {
  addUnsubscribeContent
}