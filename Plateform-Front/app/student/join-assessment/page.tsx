"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  ArrowLeft,
  Clock,
  FileText,
  Info,
  Eye,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import DashboardHeader from "@/components/dashboard-header";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/language-context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";

export default function JoinAssessment() {
  const { t, language } = useLanguage();
  const [assessmentType, setAssessmentType] = useState("practice");
  const [assessmentCode, setAssessmentCode] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Translation dictionary for the page
  const translations = {
    fr: {
      join_assessment_title: "Rejoindre une évaluation",
      enter_code: "Entrez le code d'accès fourni par votre professeur",
      training_assessment: "Évaluation d'entraînement",
      summative_assessment: "Évaluation sommative",
      training_description:
        "Entraînez-vous sans limite de temps ni restriction",
      summative_description:
        "Évaluation notée avec surveillance et restrictions",
      no_time_limit: "Pas de limite de temps",
      unlimited_attempts: "Tentatives illimitées",
      good_to_know: "Bon à savoir",
      training_info:
        "Les résultats ne seront pas comptabilisés dans votre note finale",
      fixed_duration: "Durée limitée",
      single_attempt: "Une seule tentative",
      important: "Important",
      summative_warning:
        "Cette évaluation sera surveillée et comptabilisée dans votre note finale",
      assessment_code: "Code d'évaluation",
      verify_code: "Vérifier le code",
      duration: "Durée",
      questions: "Questions",
      attempts: "Tentatives",
      code: "Code",
      restrictions: "Restrictions",
      accept_assessment_terms: "J'accepte les conditions de l'évaluation",
      understand_monitoring:
        "Je comprends que cette évaluation sera surveillée",
      start_assessment: "Commencer l'évaluation",
      see_example: "Voir un exemple",
      example_title: "Exemple d'évaluation sommative",
      time_remaining: "Temps restant",
      question: "Question",
      of: "sur",
      next_question: "Question suivante",
      previous_question: "Question précédente",
      submit_assessment: "Soumettre l'évaluation",
      minutes: "minutes",
      seconds: "secondes",
      select_answer: "Sélectionnez votre réponse",
      warning_title: "Attention",
      warning_message:
        "Vous ne pourrez pas revenir en arrière après avoir soumis cette question",
      java_question:
        "Quelle est la différence entre une classe abstraite et une interface en Java?",
      option1:
        "Une classe abstraite peut avoir des méthodes implémentées, une interface ne peut pas",
      option2:
        "Une interface peut être instanciée, une classe abstraite ne peut pas",
      option3:
        "Une classe peut hériter de plusieurs classes abstraites, mais ne peut implémenter qu'une seule interface",
      option4: "Il n'y a aucune différence fonctionnelle entre les deux",
    },
    en: {
      join_assessment_title: "Join Assessment",
      enter_code: "Enter the assessment code",
      training_assessment: "Training Assessment",
      summative_assessment: "Summative Assessment",
      training_description: "Practice without time limits or restrictions",
      summative_description:
        "Graded assessment with monitoring and restrictions",
      no_time_limit: "No time limit",
      unlimited_attempts: "Unlimited attempts",
      good_to_know: "Good to know",
      training_info: "Results will not count towards your final grade",
      fixed_duration: "Fixed duration",
      single_attempt: "Single attempt",
      important: "Important",
      summative_warning:
        "This assessment will be monitored and counted towards your final grade",
      assessment_code: "Assessment Code",
      verify_code: "Verify Code",
      duration: "Duration",
      questions: "Questions",
      attempts: "Attempts",
      code: "Code",
      restrictions: "Restrictions",
      accept_assessment_terms: "I accept the assessment terms",
      understand_monitoring: "I understand this assessment will be monitored",
      start_assessment: "Start Assessment",
      see_example: "See Example",
      example_title: "Summative Assessment Example",
      time_remaining: "Time remaining",
      question: "Question",
      of: "of",
      next_question: "Next Question",
      previous_question: "Previous Question",
      submit_assessment: "Submit Assessment",
      minutes: "minutes",
      seconds: "seconds",
      select_answer: "Select your answer",
      warning_title: "Warning",
      warning_message:
        "You will not be able to go back after submitting this question",
      java_question:
        "What is the difference between an abstract class and an interface in Java?",
      option1:
        "An abstract class can have implemented methods, an interface cannot",
      option2: "An interface can be instantiated, an abstract class cannot",
      option3:
        "A class can inherit from multiple abstract classes, but can only implement one interface",
      option4: "There is no functional difference between the two",
    },
  };

  // Helper function to get translations
  const translate = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  // Mock assessment data based on the code
  const assessmentDetails = {
    title:
      language === "fr"
        ? "Programmation Java - Interfaces et Classes Abstraites"
        : "Java Programming - Interfaces and Abstract Classes",
    professor: "Mr Abid",
    class: language === "fr" ? "3ème année" : "3rd year",
    duration:
      assessmentType === "practice"
        ? language === "fr"
          ? "Illimité"
          : "Unlimited"
        : "1h30",
    questions: 15,
    attempts:
      assessmentType === "practice"
        ? language === "fr"
          ? "Illimitées"
          : "Unlimited"
        : "1",
    restrictions:
      assessmentType === "summative"
        ? [
            language === "fr"
              ? "Copier-coller désactivé"
              : "Copy-paste disabled",
            language === "fr"
              ? "Changement d'onglet/fenêtre interdit"
              : "Tab/window switching prohibited",
            language === "fr"
              ? "Accès aux ressources externes bloqué"
              : "External resources access blocked",
          ]
        : [],
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    if (assessmentCode.trim()) {
      setShowDetails(true);
    }
  };

  const handleStartAssessment = () => {
    // In a real app, this would navigate to the assessment page
    window.location.href = `/student/assessment?type=${assessmentType}&code=${assessmentCode}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader userType="student" userName="Ahmed Benali" />

      <main className="flex-1">
        <div className="container py-6">
          <div className="flex items-center gap-2 mb-8">
            <Button variant="outline" size="icon" asChild>
              <Link href="/student/dashboard">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className=" text-3xl font-bold tracking-tight dark:text-white">
                {translate("join_assessment_title")}
              </h1>
              <p className="text-muted-foreground">{translate("enter_code")}</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Tabs
                value={assessmentType}
                onValueChange={setAssessmentType}
                className="space-y-4"
              >
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="practice">
                    {translate("training_assessment")}
                  </TabsTrigger>
                  <TabsTrigger value="summative">
                    {translate("summative_assessment")}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="practice" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>{translate("training_assessment")}</CardTitle>
                      <CardDescription>
                        {translate("training_description")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {translate("no_time_limit")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {translate("unlimited_attempts")}
                          </span>
                        </div>
                      </div>
                      <Alert className="bg-blue-50 border-blue-200">
                        <Info className="h-4 w-4 text-blue-600" />
                        <AlertTitle className="text-blue-600">
                          {translate("good_to_know")}
                        </AlertTitle>
                        <AlertDescription className="text-blue-600">
                          {translate("training_info")}
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="summative" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>{translate("summative_assessment")}</CardTitle>
                      <CardDescription>
                        {translate("summative_description")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {translate("fixed_duration")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {translate("single_attempt")}
                          </span>
                        </div>
                      </div>
                      <Alert className="bg-amber-50 border-amber-200">
                        <AlertCircle className="h-4 w-4 text-amber-600" />
                        <AlertTitle className="text-amber-600">
                          {translate("important")}
                        </AlertTitle>
                        <AlertDescription className="text-amber-600">
                          {translate("summative_warning")}
                        </AlertDescription>
                      </Alert>

                      {/* <Button variant="outline" className="w-full" onClick={() => setShowPreview(true)}>
                        <Eye className="mr-2 h-4 w-4" />
                        {translate("see_example")}
                      </Button> */}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>{translate("assessment_code")}</CardTitle>
                  <CardDescription>{translate("enter_code")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCodeSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="assessment-code">
                        {translate("assessment_code")}
                      </Label>
                      <Input
                        id="assessment-code"
                        placeholder="Ex: ABC123"
                        value={assessmentCode}
                        onChange={(e) => setAssessmentCode(e.target.value)}
                        className="text-center text-lg font-mono"
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      {translate("verify_code")}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* {showDetails && (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{assessmentDetails.title}</CardTitle>
                      <CardDescription>
                        Prof. {assessmentDetails.professor} • {assessmentDetails.class}
                      </CardDescription>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        assessmentType === "practice" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
                      }
                    >
                      {assessmentType === "practice"
                        ? translate("training_assessment")
                        : translate("summative_assessment")}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">{translate("duration")}</h3>
                      <p>{assessmentDetails.duration}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">{translate("questions")}</h3>
                      <p>{assessmentDetails.questions}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">{translate("attempts")}</h3>
                      <p>{assessmentDetails.attempts}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">{translate("code")}</h3>
                      <p className="font-mono">{assessmentCode}</p>
                    </div>
                  </div>

                  {assessmentType === "summative" && (
                    <>
                      <Separator />

                      <div>
                        <h3 className="text-sm font-medium mb-2">{translate("restrictions")}</h3>
                        <ul className="space-y-2">
                          {assessmentDetails.restrictions.map((restriction, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm">
                              <AlertCircle className="h-4 w-4 text-amber-600" />
                              <span>{restriction}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="terms"
                          checked={agreedToTerms}
                          onCheckedChange={(checked) => setAgreedToTerms(checked)}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <Label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {translate("accept_assessment_terms")}
                          </Label>
                          <p className="text-sm text-muted-foreground">{translate("understand_monitoring")}</p>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    onClick={handleStartAssessment}
                    disabled={assessmentType === "summative" && !agreedToTerms}
                  >
                    {translate("start_assessment")}
                  </Button>
                </CardFooter>
              </Card>
            )} */}
            {showDetails && (
              <Card className="flex flex-col h-full justify-between">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{assessmentDetails.title}</CardTitle>
                      <CardDescription>
                        Prof. {assessmentDetails.professor} •{" "}
                        {assessmentDetails.class}
                      </CardDescription>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        assessmentType === "practice"
                          ? "bg-green-50 text-green-700"
                          : "bg-amber-50 text-amber-700"
                      }
                    >
                      {assessmentType === "practice"
                        ? translate("training_assessment")
                        : translate("summative_assessment")}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        {translate("duration")}
                      </h3>
                      <p>{assessmentDetails.duration}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        {translate("questions")}
                      </h3>
                      <p>{assessmentDetails.questions}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        {translate("attempts")}
                      </h3>
                      <p>{assessmentDetails.attempts}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        {translate("code")}
                      </h3>
                      <p className="font-mono">{assessmentCode}</p>
                    </div>
                  </div>

                  {assessmentType === "summative" && (
                    <div className="flex flex-col gap-4 mt-4">
                      <Separator />
                      <div>
                        <h3 className="text-sm font-medium mb-2">
                          {translate("restrictions")}
                        </h3>
                        <ul className="space-y-2">
                          {assessmentDetails.restrictions.map(
                            (restriction, i) => (
                              <li
                                key={i}
                                className="flex items-center gap-2 text-sm"
                              >
                                <AlertCircle className="h-4 w-4 text-amber-600" />
                                <span>{restriction}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="terms"
                          checked={agreedToTerms}
                          onCheckedChange={(checked) =>
                            setAgreedToTerms(checked)
                          }
                        />
                        <div className="grid gap-1.5 leading-none">
                          <Label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {translate("accept_assessment_terms")}
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {translate("understand_monitoring")}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="mt-auto">
                  <Button
                    className="w-full"
                    onClick={handleStartAssessment}
                    disabled={assessmentType === "summative" && !agreedToTerms}
                  >
                    {translate("start_assessment")}
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>

          {/* Summative Assessment Example Dialog */}
          <Dialog open={showPreview} onOpenChange={setShowPreview}>
            <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
              <DialogHeader>
                <DialogTitle>{translate("example_title")}</DialogTitle>
                <DialogDescription>{assessmentDetails.title}</DialogDescription>
              </DialogHeader>

              <div className="flex-1 overflow-auto">
                <div className="p-4 border-b sticky top-0 bg-white dark:bg-gray-950 z-10">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-red-500" />
                      <span className="font-medium text-red-500">
                        {translate("time_remaining")}: 45:23
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {translate("question")} 3 {translate("of")} 15
                    </div>
                  </div>
                  <Progress value={20} className="h-2" />
                </div>

                <div className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700"
                      >
                        2 points
                      </Badge>
                      <h2 className="text-xl font-semibold">
                        {translate("java_question")}
                      </h2>
                    </div>

                    <Alert className="bg-amber-50 border-amber-200">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                      <AlertTitle className="text-amber-600">
                        {translate("warning_title")}
                      </AlertTitle>
                      <AlertDescription className="text-amber-600">
                        {translate("warning_message")}
                      </AlertDescription>
                    </Alert>

                    <div className="pt-4">
                      <h3 className="text-sm font-medium mb-3">
                        {translate("select_answer")}
                      </h3>
                      <RadioGroup defaultValue="option1" className="space-y-3">
                        <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-muted/50">
                          <RadioGroupItem value="option1" id="option1" />
                          <Label
                            htmlFor="option1"
                            className="flex-1 cursor-pointer"
                          >
                            {translate("option1")}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-muted/50">
                          <RadioGroupItem value="option2" id="option2" />
                          <Label
                            htmlFor="option2"
                            className="flex-1 cursor-pointer"
                          >
                            {translate("option2")}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-muted/50">
                          <RadioGroupItem value="option3" id="option3" />
                          <Label
                            htmlFor="option3"
                            className="flex-1 cursor-pointer"
                          >
                            {translate("option3")}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-muted/50">
                          <RadioGroupItem value="option4" id="option4" />
                          <Label
                            htmlFor="option4"
                            className="flex-1 cursor-pointer"
                          >
                            {translate("option4")}
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t p-4 flex justify-between">
                <Button variant="outline">
                  {translate("previous_question")}
                </Button>
                <Button>{translate("next_question")}</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
}
