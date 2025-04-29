import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Clock, FileText, Users } from "lucide-react"

export default function NewEvaluationPage() {
  // In a real implementation, this would use the language context
  const translations = {
    createEvaluation: "Create New Evaluation",
    basicInfo: "Basic Information",
    questions: "Questions",
    settings: "Settings",
    review: "Review",
    title: "Evaluation Title",
    description: "Description",
    subject: "Subject",
    grade: "Grade Level",
    duration: "Duration (minutes)",
    questionType: "Question Type",
    questionText: "Question Text",
    points: "Points",
    addQuestion: "Add Question",
    evaluationType: "Evaluation Type",
    accessSettings: "Access Settings",
    password: "Password Protection (Optional)",
    timeLimit: "Time Limit",
    allowRetakes: "Allow Retakes",
    showResults: "Show Results to Students",
    immediately: "Immediately",
    afterClosing: "After Closing",
    never: "Never",
    saveAsDraft: "Save as Draft",
    publish: "Publish Evaluation",
    cancel: "Cancel",
    questionOptions: "Answer Options",
    addOption: "Add Option",
    correctAnswer: "Mark as Correct Answer",
    preview: "Preview",
    back: "Back",
    next: "Next",
    finish: "Finish",
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <DashboardHeader
        title={translations.createEvaluation}
        showSearch={false}
        className="bg-gradient-to-r from-blue-600 to-indigo-700"
      />

      <main className="flex-1 container mx-auto py-6 px-4 md:px-6">
        <Tabs defaultValue="basicInfo" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-4 w-full max-w-3xl">
              <TabsTrigger value="basicInfo" className="flex flex-col items-center gap-1 py-3">
                <FileText className="h-4 w-4" />
                {translations.basicInfo}
              </TabsTrigger>
              <TabsTrigger value="questions" className="flex flex-col items-center gap-1 py-3">
                <CheckCircle className="h-4 w-4" />
                {translations.questions}
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex flex-col items-center gap-1 py-3">
                <Clock className="h-4 w-4" />
                {translations.settings}
              </TabsTrigger>
              <TabsTrigger value="review" className="flex flex-col items-center gap-1 py-3">
                <Users className="h-4 w-4" />
                {translations.review}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="basicInfo">
            <Card>
              <CardHeader>
                <CardTitle>{translations.basicInfo}</CardTitle>
                <CardDescription>Enter the basic information for your evaluation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">{translations.title}</Label>
                  <Input id="title" placeholder="Enter evaluation title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">{translations.description}</Label>
                  <Textarea id="description" placeholder="Enter a description for this evaluation" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">{translations.subject}</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="math">Mathematics</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="language">Language Arts</SelectItem>
                        <SelectItem value="social">Social Studies</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="grade">{translations.grade}</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select grade level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="elementary">Elementary School</SelectItem>
                        <SelectItem value="middle">Middle School</SelectItem>
                        <SelectItem value="high">High School</SelectItem>
                        <SelectItem value="college">College/University</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">{translations.duration}</Label>
                  <Input id="duration" type="number" placeholder="60" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">{translations.cancel}</Button>
                <Button>{translations.next}</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="questions">
            <Card>
              <CardHeader>
                <CardTitle>{translations.questions}</CardTitle>
                <CardDescription>Create questions for your evaluation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Question 1</h3>
                    <Select defaultValue="multiple">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={translations.questionType} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="multiple">Multiple Choice</SelectItem>
                        <SelectItem value="truefalse">True/False</SelectItem>
                        <SelectItem value="short">Short Answer</SelectItem>
                        <SelectItem value="essay">Essay</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="question-text">{translations.questionText}</Label>
                    <Textarea id="question-text" placeholder="Enter your question here" />
                  </div>

                  <div className="space-y-4">
                    <Label>{translations.questionOptions}</Label>

                    {[1, 2, 3, 4].map((option) => (
                      <div key={option} className="flex items-center gap-3">
                        <Input placeholder={`Option ${option}`} className="flex-1" />
                        <Button variant="outline" size="sm" className="shrink-0">
                          {translations.correctAnswer}
                        </Button>
                      </div>
                    ))}

                    <Button variant="outline" size="sm">
                      {translations.addOption}
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <Label htmlFor="points">{translations.points}</Label>
                    <Input id="points" type="number" className="w-20" defaultValue="10" />
                  </div>
                </div>

                <Separator />

                <Button variant="outline" className="w-full">
                  {translations.addQuestion}
                </Button>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">{translations.back}</Button>
                <Button>{translations.next}</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>{translations.settings}</CardTitle>
                <CardDescription>Configure evaluation settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="evaluationType">{translations.evaluationType}</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select evaluation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quiz">Quiz</SelectItem>
                      <SelectItem value="test">Test</SelectItem>
                      <SelectItem value="exam">Exam</SelectItem>
                      <SelectItem value="assignment">Assignment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">{translations.password}</Label>
                  <Input id="password" type="password" placeholder="Enter password (optional)" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeLimit">{translations.timeLimit}</Label>
                  <div className="flex items-center gap-2">
                    <Input id="timeLimit" type="number" placeholder="60" />
                    <span>minutes</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{translations.showResults}</Label>
                  <Select defaultValue="immediately">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediately">{translations.immediately}</SelectItem>
                      <SelectItem value="afterClosing">{translations.afterClosing}</SelectItem>
                      <SelectItem value="never">{translations.never}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">{translations.back}</Button>
                <Button>{translations.next}</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="review">
            <Card>
              <CardHeader>
                <CardTitle>{translations.review}</CardTitle>
                <CardDescription>Review your evaluation before publishing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Basic Information</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">Title:</div>
                    <div>Advanced Mathematics Midterm</div>
                    <div className="font-medium">Subject:</div>
                    <div>Mathematics</div>
                    <div className="font-medium">Grade Level:</div>
                    <div>High School</div>
                    <div className="font-medium">Duration:</div>
                    <div>60 minutes</div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="font-medium">Questions</h3>
                  <div className="text-sm">
                    <p>Total Questions: 5</p>
                    <p>Total Points: 50</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="font-medium">Settings</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">Evaluation Type:</div>
                    <div>Exam</div>
                    <div className="font-medium">Password Protected:</div>
                    <div>Yes</div>
                    <div className="font-medium">Time Limit:</div>
                    <div>60 minutes</div>
                    <div className="font-medium">Show Results:</div>
                    <div>After Closing</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">{translations.back}</Button>
                <div className="flex gap-2">
                  <Button variant="outline">{translations.saveAsDraft}</Button>
                  <Button>{translations.publish}</Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
