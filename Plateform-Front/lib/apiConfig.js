const API_BASE_URL = 'http://localhost:8000'; 
export const getUserData = async (userId, token) => {
    const response = await fetch(`http://localhost:8000/users/data/${userId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    
    if (!response.ok) throw new Error("Failed to load user data")
    return response.json()
  }
  
  export const getEvaluations = async (userId, token) => {
    const response = await fetch(`http://localhost:8000/courses/evaluations/${userId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    
    if (!response.ok) throw new Error("Failed to load evaluations")
    return response.json()
  }
  
  export const joinEvaluation = async (userId, token, code) => {
    const response = await fetch(`http://localhost:8000/courses/evaluations/join-assessment/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId, code })
    })
    
    if (!response.ok) throw new Error("Failed to join assessment")
    return response.json()
  }
  