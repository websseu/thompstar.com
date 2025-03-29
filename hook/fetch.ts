export async function fetchKoreaData(koreaService: string, date: string) {
  try {
    const response = await fetch(
      `https://websseu.github.io/thompdata/korea/${koreaService}/${koreaService}Top100_${date}.json`
    )

    if (!response.ok) {
      throw new Error(`챠트 데이터를 가져오지 못했습니다.: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error('챠트 데이터 에러 발생:', error)
    return []
  }
}

export async function fetchWorldData(
  worldService: string,
  country: string,
  date: string
) {
  try {
    const response = await fetch(
      `https://websseu.github.io/thompdata/${worldService}/${country}/${country}Top100_${date}.json`
    )

    if (!response.ok) {
      throw new Error(`챠트 데이터를 가져오지 못했습니다.: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error('챠트 데이터 에러 발생:', error)
    return []
  }
}

export async function fetchMainKoreaData(date: string) {
  try {
    const response = await fetch(
      `https://websseu.github.io/thompdata/main/korea-main_${date}.json`
    )

    if (!response.ok) {
      throw new Error(`챠트 데이터를 가져오지 못했습니다.: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error('챠트 데이터 에러 발생:', error)
    return []
  }
}

export async function fetchMainYoutubeData(date: string) {
  try {
    const response = await fetch(
      `https://websseu.github.io/thompdata/main2/youtube-main_${date}.json`
    )

    if (!response.ok) {
      throw new Error(`챠트 데이터를 가져오지 못했습니다.: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error('챠트 데이터 에러 발생:', error)
    return []
  }
}
