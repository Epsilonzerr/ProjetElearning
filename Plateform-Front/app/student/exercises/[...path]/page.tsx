"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import DashboardHeader from "@/components/dashboard-header"
import { ArrowLeft, Check, FileText, Play, Send, BookOpen } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function ExercisesPage({ params }: { params: { path: string[] } }) {
  const { t } = useLanguage()
  const category = params.path[0]
  const exerciseType = params.path[1]

  // Mock exercise data
  const exercise = {
    title:
      category === "poo"
        ? exerciseType === "interfaces"
          ? "Implémentation d'interfaces"
          : exerciseType === "abstract-classes"
            ? "Création de classes abstraites"
            : "Application du polymorphisme"
        : "Exercice",
    description: "Exercice pratique pour renforcer vos compétences",
    instructions: `
      <h3>Instructions</h3>
      <p>Dans cet exercice, vous allez mettre en pratique les concepts de ${
        exerciseType === "interfaces"
          ? "l'implémentation d'interfaces"
          : exerciseType === "abstract-classes"
            ? "la création de classes abstraites"
            : "l'application du polymorphisme"
      } en Java.</p>
      
      <h4>Objectifs:</h4>
      <ol>
        <li>Créer ${
          exerciseType === "interfaces"
            ? "une interface"
            : exerciseType === "abstract-classes"
              ? "une classe abstraite"
              : "une hiérarchie de classes utilisant le polymorphisme"
        }</li>
        <li>Implémenter les méthodes requises</li>
        <li>Tester votre implémentation</li>
      </ol>
      
      <h4>Exemple:</h4>
      <pre><code>
      ${
        exerciseType === "interfaces"
          ? `interface Drawable {
    void draw();
}

class Circle implements Drawable {
    @Override
    public void draw() {
        System.out.println("Drawing a circle");
    }
}`
          : exerciseType === "abstract-classes"
            ? `abstract class Shape {
    abstract double area();
    
    void display() {
        System.out.println("Area: " + area());
    }
}

class Rectangle extends Shape {
    private double width;
    private double height;
    
    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }
    
    @Override
    double area() {
        return width * height;
    }
}`
            : `class Animal {
    void makeSound() {
        System.out.println("Animal makes a sound");
    }
}

class Dog extends Animal {
    @Override
    void makeSound() {
        System.out.println("Dog barks");
    }
}

class Cat extends Animal {
    @Override
    void makeSound() {
        System.out.println("Cat meows");
    }
}`
      }
      </code></pre>
    `,
    task: `
      <h3>Tâche</h3>
      <p>${
        exerciseType === "interfaces"
          ? "Créez une interface nommée 'Calculable' avec une méthode 'calculate()' qui retourne un double. Implémentez cette interface dans deux classes: 'Addition' et 'Multiplication'."
          : exerciseType === "abstract-classes"
            ? "Créez une classe abstraite 'Vehicle' avec une méthode abstraite 'start()' et une méthode concrète 'stop()'. Étendez cette classe avec deux classes concrètes: 'Car' et 'Motorcycle'."
            : "Créez une classe de base 'Employee' avec une méthode 'calculateSalary()'. Créez deux sous-classes: 'FullTimeEmployee' et 'PartTimeEmployee' qui redéfinissent cette méthode."
      }</p>
    `,
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader userType="student" userName="Ahmed Benali" />

      <main className="flex-1">
        <div className="container py-6">
          <div className="flex items-center gap-2 mb-8">
            <Button variant="outline" size="icon" asChild>
              <Link href="/student/recommendations">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{exercise.title}</h1>
              <p className="text-muted-foreground">{exercise.description}</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <Tabs defaultValue="instructions" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="instructions">Instructions</TabsTrigger>
                  <TabsTrigger value="task">Tâche</TabsTrigger>
                  <TabsTrigger value="solution">Solution</TabsTrigger>
                </TabsList>

                <TabsContent value="instructions">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: exercise.instructions }} />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="task">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: exercise.task }} />

                      <div className="mt-6">
                        <h3 className="text-lg font-medium mb-2">Votre solution:</h3>
                        <Textarea placeholder="Écrivez votre code ici..." className="font-mono" rows={15} />
                        <Button className="mt-4">
                          <Send className="mr-2 h-4 w-4" /> Soumettre
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="solution">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="prose max-w-none">
                        <h3>Solution</h3>
                        <p>Voici une solution possible pour cet exercice:</p>
                        <pre>
                          <code>
                            {exerciseType === "interfaces"
                              ? `interface Calculable {
    double calculate();
}

class Addition implements Calculable {
    private double a;
    private double b;
    
    public Addition(double a, double b) {
        this.a = a;
        this.b = b;
    }
    
    @Override
    public double calculate() {
        return a + b;
    }
}

class Multiplication implements Calculable {
    private double a;
    private double b;
    
    public Multiplication(double a, double b) {
        this.a = a;
        this.b = b;
    }
    
    @Override
    public double calculate() {
        return a * b;
    }
}

public class Main {
    public static void main(String[] args) {
        Calculable addition = new Addition(5, 3);
        Calculable multiplication = new Multiplication(5, 3);
        
        System.out.println("Addition: " + addition.calculate());
        System.out.println("Multiplication: " + multiplication.calculate());
    }
}`
                              : exerciseType === "abstract-classes"
                                ? `abstract class Vehicle {
    abstract void start();
    
    void stop() {
        System.out.println("Vehicle stopped");
    }
}

class Car extends Vehicle {
    @Override
    void start() {
        System.out.println("Car started");
    }
}

class Motorcycle extends Vehicle {
    @Override
    void start() {
        System.out.println("Motorcycle started");
    }
}

public class Main {
    public static void main(String[] args) {
        Vehicle car = new Car();
        Vehicle motorcycle = a new Motorcycle();
        
        car.start();
        car.stop();
        
        motorcycle.start();
        motorcycle.stop();
    }
}`
                                : `class Employee {
    protected double baseSalary;
    
    public Employee(double baseSalary) {
        this.baseSalary = baseSalary;
    }
    
    public double calculateSalary() {
        return baseSalary;
    }
}

class FullTimeEmployee extends Employee {
    private double bonus;
    
    public FullTimeEmployee(double baseSalary, double bonus) {
        super(baseSalary);
        this.bonus = bonus;
    }
    
    @Override
    public double calculateSalary() {
        return baseSalary + bonus;
    }
}

class PartTimeEmployee extends Employee {
    private int hoursWorked;
    private double hourlyRate;
    
    public PartTimeEmployee(double baseSalary, int hoursWorked, double hourlyRate) {
        super(baseSalary);
        this.hoursWorked = hoursWorked;
        this.hourlyRate = hourlyRate;
    }
    
    @Override
    public double calculateSalary() {
        return baseSalary + (hoursWorked * hourlyRate);
    }
}

public class Main {
    public static void main(String[] args) {
        Employee fullTime = new FullTimeEmployee(3000, 500);
        Employee partTime = new PartTimeEmployee(1000, 20, 15);
        
        System.out.println("Full-time employee salary: " + fullTime.calculateSalary());
        System.out.println("Part-time employee salary: " + partTime.calculateSalary());
    }
}`}
                          </code>
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Progression</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50">
                      <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-sm">Instructions lues</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50">
                      <div className="h-5 w-5 rounded-full border border-muted-foreground"></div>
                      <span className="text-sm">Solution soumise</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50">
                      <div className="h-5 w-5 rounded-full border border-muted-foreground"></div>
                      <span className="text-sm">Exercice complété</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ressources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/student/resource/0">
                      <BookOpen className="mr-2 h-4 w-4" /> Documentation
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/student/resource/1">
                      <Play className="mr-2 h-4 w-4" /> Tutoriel vidéo
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/student/learning/poo/interfaces-classes-abstraites">
                      <FileText className="mr-2 h-4 w-4" /> Cours associé
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
