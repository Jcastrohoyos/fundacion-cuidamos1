export async function sendToWeb3Forms(data: Record<string, unknown>): Promise<boolean> {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
  if (!accessKey || accessKey === 'TU_ACCESS_KEY_DE_WEB3FORMS') return false

  const payload = {
    access_key: accessKey,
    ...data,
  }

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
    const json = await res.json()
    return res.status === 200 && json.success
  } catch {
    return false
  }
}
