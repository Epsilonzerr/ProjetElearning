const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

async function parseJson(response) {
  const text = await response.text()
  return text ? JSON.parse(text) : {}
}

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  })

  const data = await parseJson(response)

  if (!response.ok) {
    throw new Error(data.detail || data.error || "Request failed")
  }

  return data
}

export async function loginUser(email, password) {
  return request("/users/login/", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })
}

export async function getUserData(userId, token) {
  return request(`/users/data/${userId}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function getEvaluations(userId, token) {
  return request(`/courses/evaluations/${userId}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function getProfessorEvaluations(userId, token) {
  return request(`/courses/professor/evaluations/${userId}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function joinEvaluation(userId, token, code) {
  return request("/courses/evaluations/join-assessment/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, code }),
  })
}
  
