export async function sendToWeb3Forms(data: Record<string, unknown>): Promise<boolean> {
  try {
    const payload: Record<string, string> = {}
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        payload[key] = String(value)
      }
    })

    const res = await fetch('https://formsubmit.co/ajax/info@cuidamosconamor.org', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: new URLSearchParams(payload).toString(),
    })

    const json = await res.json()
    return res.status === 200 && json.success
  } catch {
    return false
  }
}
