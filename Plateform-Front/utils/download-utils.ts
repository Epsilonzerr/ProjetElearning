/**
 * Utility functions for downloading assessment data
 */

export function downloadAssessmentData(assessmentId: string, format: "pdf" | "csv" = "pdf") {
  // In a real application, this would make an API call to generate and download the file
  // For demonstration purposes, we'll create a simple CSV or mock a PDF download

  if (format === "csv") {
    const csvContent = generateMockCsvContent(assessmentId)
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `assessment-${assessmentId}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } else {
    // For PDF, in a real app we would generate a PDF server-side
    // For demo purposes, we'll just open a new window with a message
    const win = window.open("", "_blank")
    if (win) {
      win.document.write(`
        <html>
          <head>
            <title>Assessment ${assessmentId} PDF</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 40px; }
              h1 { color: #333; }
              .note { color: #666; margin-top: 20px; }
            </style>
          </head>
          <body>
            <h1>Assessment ${assessmentId}</h1>
            <p>This is a demonstration of the PDF download feature.</p>
            <p>In a production environment, this would be a properly formatted PDF document with all assessment data.</p>
            <div class="note">Note: This is a simulated PDF for demonstration purposes.</div>
          </body>
        </html>
      `)
    }
  }
}

function generateMockCsvContent(assessmentId: string): string {
  // Generate mock CSV data for the assessment
  return `Assessment ID,Title,Class,Subject,Time Limit,Questions,Status
${assessmentId},Sample Assessment Title,Third Year,Programming,60,5,Active
  
Question ID,Type,Text,Points,Options,Correct Answer
q1,multiple-choice,What is the time complexity of quicksort?,2,"O(n),O(n log n),O(n²),O(log n)",O(n log n)
q2,short-answer,Define polymorphism in OOP,3,,Object taking multiple forms
q3,multiple-choice,Which data structure uses LIFO?,1,"Queue,Stack,Tree,Heap",Stack
`
}
