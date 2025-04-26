"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "fr" | "en"

interface Translations {
  [key: string]: {
    fr: string
    en: string
  }
}

const translations: Translations = {
  // Common
  login: {
    fr: "Connexion",
    en: "Login",
  },
  logout: {
    fr: "Déconnexion",
    en: "Logout",
  },
  learn_more: {
    fr: "En savoir plus",
    en: "Learn more",
  },
  dashboard: {
    fr: "Tableau de bord",
    en: "Dashboard",
  },
  assessments: {
    fr: "Évaluations",
    en: "Assessments",
  },
  students: {
    fr: "Étudiants",
    en: "Students",
  },
  results: {
    fr: "Résultats",
    en: "Results",
  },
  statistics: {
    fr: "Statistiques",
    en: "Statistics",
  },
  recommendations: {
    fr: "Recommandations",
    en: "Recommendations",
  },
  profile: {
    fr: "Profil",
    en: "Profile",
  },
  settings: {
    fr: "Paramètres",
    en: "Settings",
  },
  language: {
    fr: "Langue",
    en: "Language",
  },
  search: {
    fr: "Rechercher",
    en: "Search",
  },
  notifications: {
    fr: "Notifications",
    en: "Notifications",
  },
  no_notifications: {
    fr: "Aucune notification",
    en: "No notifications",
  },

  // Login related
  student_access: {
    fr: "Accès étudiant",
    en: "Student access",
  },
  professor_access: {
    fr: "Accès professeur",
    en: "Professor access",
  },
  forgot_password: {
    fr: "Mot de passe oublié ?",
    en: "Forgot password?",
  },
  password: {
    fr: "Mot de passe",
    en: "Password",
  },
  of: {
    fr: "sur",
    en: "of",
  },
  completed: {
    fr: "complété",
    en: "completed",
  },
  question: {
    fr: "Question",
    en: "Question",
  },

  // Assessment related
  join_assessment: {
    fr: "Rejoindre une évaluation",
    en: "Join an assessment",
  },
  training_assessment: {
    fr: "Évaluation d'entraînement",
    en: "Training assessment",
  },
  summative_assessment: {
    fr: "Évaluation sommative",
    en: "Summative assessment",
  },
  enter_assessment_code: {
    fr: "Entrez le code de l'évaluation",
    en: "Enter assessment code",
  },
  join: {
    fr: "Rejoindre",
    en: "Join",
  },
  finish: {
    fr: "Terminer",
    en: "Finish",
  },
  previous: {
    fr: "Précédent",
    en: "Previous",
  },
  next: {
    fr: "Suivant",
    en: "Next",
  },
  navigation: {
    fr: "Navigation",
    en: "Navigation",
  },
  assessment_progress: {
    fr: "Progression de l'évaluation",
    en: "Assessment progress",
  },
  enter_answer_here: {
    fr: "Entrez votre réponse ici",
    en: "Enter your answer here",
  },
  finish_assessment_question: {
    fr: "Terminer l'évaluation ?",
    en: "Finish assessment?",
  },
  summative_submit_warning: {
    fr: "Une fois soumise, vous ne pourrez plus modifier vos réponses pour cette évaluation sommative.",
    en: "Once submitted, you will not be able to modify your answers for this summative assessment.",
  },
  practice_submit_info: {
    fr: "Vous pouvez revoir cette évaluation d'entraînement à tout moment.",
    en: "You can review this practice assessment at any time.",
  },
  questions_answered: {
    fr: "Questions répondues",
    en: "Questions answered",
  },
  cancel: {
    fr: "Annuler",
    en: "Cancel",
  },
  submit: {
    fr: "Soumettre",
    en: "Submit",
  },
  leave_assessment_question: {
    fr: "Quitter l'évaluation ?",
    en: "Leave assessment?",
  },
  leave_assessment_warning: {
    fr: "Si vous quittez maintenant, votre progression ne sera pas sauvegardée.",
    en: "If you leave now, your progress will not be saved.",
  },
  leave_assessment: {
    fr: "Quitter l'évaluation",
    en: "Leave assessment",
  },
  tab_switch_detected: {
    fr: "Changement d'onglet détecté",
    en: "Tab switch detected",
  },
  understand: {
    fr: "Je comprends",
    en: "I understand",
  },
  copy_paste_disabled: {
    fr: "Copier-coller désactivé",
    en: "Copy-paste disabled",
  },
  active_restrictions: {
    fr: "Restrictions actives",
    en: "Active restrictions",
  },
  copy_paste_disabled_info: {
    fr: "Le copier-coller est désactivé pour cette évaluation",
    en: "Copy-paste is disabled for this assessment",
  },
  back_navigation_limited: {
    fr: "La navigation arrière est limitée pour les questions à réponse libre",
    en: "Back navigation is limited for open-ended questions",
  },
  tab_switching_monitored: {
    fr: "Le changement d'onglet est surveillé",
    en: "Tab switching is monitored",
  },
  time_remaining: {
    fr: "Temps restant",
    en: "Time remaining",
  },
  start_assessment: {
    fr: "Commencer l'évaluation",
    en: "Start assessment",
  },

  // Dashboard related
  active_assessments: {
    fr: "Évaluations actives",
    en: "Active assessments",
  },
  completed_assessments: {
    fr: "Évaluations terminées",
    en: "Completed assessments",
  },
  view_all: {
    fr: "Voir tout",
    en: "View all",
  },
  sort_by: {
    fr: "Trier par",
    en: "Sort by",
  },
  date_newest: {
    fr: "Date (plus récent)",
    en: "Date (newest)",
  },
  date_oldest: {
    fr: "Date (plus ancien)",
    en: "Date (oldest)",
  },
  name_az: {
    fr: "Nom (A-Z)",
    en: "Name (A-Z)",
  },
  name_za: {
    fr: "Nom (Z-A)",
    en: "Name (Z-A)",
  },

  // Notification related
  new_submission: {
    fr: "Nouvelle soumission",
    en: "New submission",
  },
  new_assessment: {
    fr: "Nouvelle évaluation",
    en: "New assessment",
  },
  student_submitted_assessment: {
    fr: "Un étudiant a soumis une évaluation",
    en: "A student has submitted an assessment",
  },
  professor_created_assessment: {
    fr: "Un professeur a créé une nouvelle évaluation",
    en: "A professor has created a new assessment",
  },
  results_available: {
    fr: "Résultats disponibles",
    en: "Results available",
  },
  assessment_results_ready: {
    fr: "Les résultats de l'évaluation sont prêts",
    en: "Assessment results are ready",
  },
  reminder: {
    fr: "Rappel",
    en: "Reminder",
  },
  assessment_due_soon: {
    fr: "Une évaluation est prévue prochainement",
    en: "An assessment is due soon",
  },
  mark_all_as_read: {
    fr: "Marquer tout comme lu",
    en: "Mark all as read",
  },
  all: {
    fr: "Tous",
    en: "All",
  },
  unread: {
    fr: "Non lus",
    en: "Unread",
  },
  reminders: {
    fr: "Rappels",
    en: "Reminders",
  },
  new: {
    fr: "Nouveau",
    en: "New",
  },
  view_details: {
    fr: "Voir les détails",
    en: "View details",
  },
  back_to_notifications: {
    fr: "Retour aux notifications",
    en: "Back to notifications",
  },
  back: {
    fr: "Retour",
    en: "Back",
  },
  view_assessment: {
    fr: "Voir l'évaluation",
    en: "View assessment",
  },
  view_results: {
    fr: "Voir les résultats",
    en: "View results",
  },
  view_all_notifications: {
    fr: "Voir toutes les notifications",
    en: "View all notifications",
  },
  assessment_platform: {
    fr: "Plateforme d'évaluation IGA",
    en: "IGA Assessment Platform",
  },
  platform_description: {
    fr: "Une plateforme innovante pour évaluer, analyser et améliorer les compétences des étudiants en génie informatique et sciences appliquées.",
    en: "An innovative platform to assess, analyze and improve the skills of students in computer engineering and applied sciences.",
  },
  main_features: {
    fr: "Principales fonctionnalités",
    en: "Main Features",
  },
  for_teachers: {
    fr: "Pour les enseignants",
    en: "For Teachers",
  },
  teachers_description: {
    fr: "Créez des évaluations personnalisées, suivez les progrès des étudiants et obtenez des analyses détaillées pour améliorer votre enseignement.",
    en: "Create customized assessments, track student progress, and get detailed analytics to improve your teaching.",
  },
  for_students: {
    fr: "Pour les étudiants",
    en: "For Students",
  },
  students_description: {
    fr: "Accédez à des évaluations adaptées, recevez des commentaires instantanés et suivez votre progression pour améliorer vos compétences.",
    en: "Access tailored assessments, receive instant feedback, and track your progress to improve your skills.",
  },
  smart_analysis: {
    fr: "Analyse intelligente",
    en: "Smart Analysis",
  },
  analysis_description: {
    fr: "Notre système d'analyse avancé identifie les forces et les faiblesses, fournissant des recommandations personnalisées pour l'amélioration.",
    en: "Our advanced analysis system identifies strengths and weaknesses, providing personalized recommendations for improvement.",
  },
  terms: {
    fr: "Conditions d'utilisation",
    en: "Terms of Use",
  },
  privacy: {
    fr: "Politique de confidentialité",
    en: "Privacy Policy",
  },
  contact: {
    fr: "Contact",
    en: "Contact",
  },
  home: {
    fr: "Accueil",
    en: "Home",
  },
  personal_info: {
    fr: "Informations personnelles",
    en: "Personal Information",
  },
  update_personal_info: {
    fr: "Mettre à jour vos informations personnelles",
    en: "Update your personal information",
  },
  first_name: {
    fr: "Prénom",
    en: "First Name",
  },
  last_name: {
    fr: "Nom",
    en: "Last Name",
  },
  email_note: {
    fr: "Votre adresse email ne peut pas être modifiée",
    en: "Your email address cannot be changed",
  },
  department: {
    fr: "Département",
    en: "Department",
  },
  class: {
    fr: "Classe",
    en: "Class",
  },
  bio: {
    fr: "Biographie",
    en: "Bio",
  },
  save: {
    fr: "Enregistrer",
    en: "Save",
  },
  profile_picture: {
    fr: "Photo de profil",
    en: "Profile Picture",
  },
  change_profile_picture: {
    fr: "Changer votre photo de profil",
    en: "Change your profile picture",
  },
  choose_image: {
    fr: "Choisir une image",
    en: "Choose Image",
  },
  image_requirements: {
    fr: "JPG, GIF ou PNG. Taille maximale de 1MB",
    en: "JPG, GIF or PNG. Max size of 1MB",
  },
  manage_account: {
    fr: "Gérer votre compte et vos préférences",
    en: "Manage your account and preferences",
  },
  change_password: {
    fr: "Changer le mot de passe",
    en: "Change Password",
  },
  update_password: {
    fr: "Mettre à jour votre mot de passe",
    en: "Update your password",
  },
  current_password: {
    fr: "Mot de passe actuel",
    en: "Current Password",
  },
  new_password: {
    fr: "Nouveau mot de passe",
    en: "New Password",
  },
  confirm_password: {
    fr: "Confirmer le mot de passe",
    en: "Confirm Password",
  },
  password_requirements: {
    fr: "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule et un chiffre.",
    en: "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, and a number.",
  },
  update_password_button: {
    fr: "Mettre à jour le mot de passe",
    en: "Update Password",
  },
  active_sessions: {
    fr: "Sessions actives",
    en: "Active Sessions",
  },
  manage_sessions: {
    fr: "Gérer vos sessions actives",
    en: "Manage your active sessions",
  },
  disconnect: {
    fr: "Déconnecter",
    en: "Disconnect",
  },
  disconnect_all: {
    fr: "Déconnecter toutes les sessions",
    en: "Disconnect All Sessions",
  },
  notification_preferences: {
    fr: "Préférences de notification",
    en: "Notification Preferences",
  },
  configure_notifications: {
    fr: "Configurer vos préférences de notification",
    en: "Configure your notification preferences",
  },
  email_notifications: {
    fr: "Notifications par email",
    en: "Email Notifications",
  },
  app_notifications: {
    fr: "Notifications dans l'application",
    en: "App Notifications",
  },
  save_preferences: {
    fr: "Enregistrer les préférences",
    en: "Save Preferences",
  },

  // About page translations
  about_platform: {
    fr: "À propos de la plateforme IGA",
    en: "About the IGA Platform",
  },
  about_platform_description: {
    fr: "Découvrez comment notre plateforme transforme l'éducation en génie informatique et sciences appliquées.",
    en: "Discover how our platform is transforming education in computer engineering and applied sciences.",
  },
  get_started: {
    fr: "Commencer",
    en: "Get Started",
  },
  the_platform: {
    fr: "La Plateforme",
    en: "The Platform",
  },
  key_features: {
    fr: "Fonctionnalités Clés",
    en: "Key Features",
  },
  benefits: {
    fr: "Avantages",
    en: "Benefits",
  },
  about_iga_platform: {
    fr: "À propos de la plateforme d'évaluation IGA",
    en: "About the IGA Assessment Platform",
  },
  platform_long_description: {
    fr: "La plateforme d'évaluation IGA est une solution éducative complète conçue pour l'Institut supérieur du Génie Appliqué à Casablanca. Notre plateforme combine des technologies de pointe avec des méthodologies pédagogiques éprouvées pour offrir une expérience d'apprentissage et d'évaluation sans précédent pour les étudiants et les enseignants.",
    en: "The IGA Assessment Platform is a comprehensive educational solution designed for the Institut supérieur du Génie Appliqué in Casablanca. Our platform combines cutting-edge technology with proven pedagogical methodologies to provide an unprecedented learning and assessment experience for students and teachers.",
  },
  our_mission: {
    fr: "Notre Mission",
    en: "Our Mission",
  },
  mission_description: {
    fr: "Transformer l'éducation en génie et sciences appliquées grâce à des évaluations innovantes et des analyses basées sur les données pour améliorer les résultats d'apprentissage.",
    en: "To transform education in engineering and applied sciences through innovative assessments and data-driven analytics to improve learning outcomes.",
  },
  our_vision: {
    fr: "Notre Vision",
    en: "Our Vision",
  },
  vision_description: {
    fr: "Devenir la référence en matière de plateformes d'évaluation éducative, en favorisant l'excellence académique et en préparant les étudiants aux défis du monde réel.",
    en: "To become the gold standard for educational assessment platforms, fostering academic excellence and preparing students for real-world challenges.",
  },
  platform_history: {
    fr: "Histoire de la Plateforme",
    en: "Platform History",
  },
  history_2020: {
    fr: "Lancement du concept initial et développement du prototype de la plateforme d'évaluation IGA.",
    en: "Launch of the initial concept and development of the IGA assessment platform prototype.",
  },
  history_2021: {
    fr: "Déploiement de la première version et tests pilotes avec un groupe sélectionné d'enseignants et d'étudiants.",
    en: "Deployment of the first version and pilot testing with a selected group of teachers and students.",
  },
  history_2022: {
    fr: "Expansion des fonctionnalités et intégration des analyses avancées et des parcours d'apprentissage personnalisés.",
    en: "Expansion of features and integration of advanced analytics and personalized learning paths.",
  },
  history_2023: {
    fr: "Lancement officiel de la plateforme complète avec support multilingue et intégration à l'échelle de l'institut.",
    en: "Official launch of the complete platform with multilingual support and institute-wide integration.",
  },
  platform_features: {
    fr: "Fonctionnalités de la Plateforme",
    en: "Platform Features",
  },
  assessment_creation: {
    fr: "Création d'Évaluations",
    en: "Assessment Creation",
  },
  assessment_creation_desc: {
    fr: "Outils intuitifs pour créer des évaluations personnalisées avec différents types de questions et niveaux de difficulté.",
    en: "Intuitive tools to create customized assessments with different question types and difficulty levels.",
  },
  analytics_insights: {
    fr: "Analyses et Insights",
    en: "Analytics & Insights",
  },
  analytics_insights_desc: {
    fr: "Tableaux de bord détaillés et visualisations pour suivre les performances et identifier les domaines d'amélioration.",
    en: "Detailed dashboards and visualizations to track performance and identify areas for improvement.",
  },
  learning_paths: {
    fr: "Parcours d'Apprentissage",
    en: "Learning Paths",
  },
  learning_paths_desc: {
    fr: "Parcours personnalisés basés sur les résultats d'évaluation pour guider les étudiants vers la maîtrise des compétences.",
    en: "Personalized paths based on assessment results to guide students toward skill mastery.",
  },
  collaboration: {
    fr: "Collaboration",
    en: "Collaboration",
  },
  collaboration_desc: {
    fr: "Outils de collaboration pour les enseignants et les étudiants, facilitant le partage de ressources et le feedback.",
    en: "Collaboration tools for teachers and students, facilitating resource sharing and feedback.",
  },
  personalized_feedback: {
    fr: "Feedback Personnalisé",
    en: "Personalized Feedback",
  },
  personalized_feedback_desc: {
    fr: "Commentaires détaillés et recommandations spécifiques pour aider les étudiants à s'améliorer.",
    en: "Detailed comments and specific recommendations to help students improve.",
  },
  secure_environment: {
    fr: "Environnement Sécurisé",
    en: "Secure Environment",
  },
  secure_environment_desc: {
    fr: "Plateforme sécurisée garantissant la confidentialité des données et l'intégrité des évaluations.",
    en: "Secure platform ensuring data privacy and assessment integrity.",
  },
  platform_benefits: {
    fr: "Avantages de la Plateforme",
    en: "Platform Benefits",
  },
  personalized_learning: {
    fr: "Apprentissage Personnalisé",
    en: "Personalized Learning",
  },
  personalized_learning_desc: {
    fr: "Adapté aux besoins individuels de chaque étudiant.",
    en: "Tailored to each student's individual needs.",
  },
  immediate_feedback: {
    fr: "Feedback Immédiat",
    en: "Immediate Feedback",
  },
  immediate_feedback_desc: {
    fr: "Résultats et commentaires instantanés après les évaluations.",
    en: "Instant results and comments after assessments.",
  },
  progress_tracking: {
    fr: "Suivi de Progression",
    en: "Progress Tracking",
  },
  progress_tracking_desc: {
    fr: "Visualisation claire de l'évolution des compétences au fil du temps.",
    en: "Clear visualization of skill evolution over time.",
  },
  flexible_learning: {
    fr: "Apprentissage Flexible",
    en: "Flexible Learning",
  },
  flexible_learning_desc: {
    fr: "Accès aux ressources et évaluations à tout moment, n'importe où.",
    en: "Access to resources and assessments anytime, anywhere.",
  },
  time_saving: {
    fr: "Gain de Temps",
    en: "Time Saving",
  },
  time_saving_desc: {
    fr: "Automatisation des tâches d'évaluation et de notation.",
    en: "Automation of assessment and grading tasks.",
  },
  data_driven_teaching: {
    fr: "Enseignement Basé sur les Données",
    en: "Data-Driven Teaching",
  },
  data_driven_teaching_desc: {
    fr: "Insights pour adapter les méthodes pédagogiques.",
    en: "Insights to adapt teaching methods.",
  },
  customizable_assessments: {
    fr: "Évaluations Personnalisables",
    en: "Customizable Assessments",
  },
  customizable_assessments_desc: {
    fr: "Création d'évaluations adaptées aux objectifs du cours.",
    en: "Creation of assessments tailored to course objectives.",
  },
  student_insights: {
    fr: "Insights sur les Étudiants",
    en: "Student Insights",
  },
  student_insights_desc: {
    fr: "Compréhension approfondie des forces et faiblesses des étudiants.",
    en: "Deep understanding of student strengths and weaknesses.",
  },
  faq_question_1: {
    fr: "Comment puis-je commencer à utiliser la plateforme?",
    en: "How can I start using the platform?",
  },
  faq_answer_1: {
    fr: "Pour commencer, créez un compte en utilisant votre email académique. Une fois inscrit, vous aurez accès à toutes les fonctionnalités correspondant à votre rôle (étudiant ou enseignant).",
    en: "To get started, create an account using your academic email. Once registered, you will have access to all features corresponding to your role (student or teacher).",
  },
  faq_question_2: {
    fr: "La plateforme est-elle accessible sur mobile?",
    en: "Is the platform accessible on mobile?",
  },
  faq_answer_2: {
    fr: "Oui, notre plateforme est entièrement responsive et peut être utilisée sur ordinateurs, tablettes et smartphones pour un accès flexible.",
    en: "Yes, our platform is fully responsive and can be used on computers, tablets, and smartphones for flexible access.",
  },
  faq_question_3: {
    fr: "Comment les données des étudiants sont-elles protégées?",
    en: "How is student data protected?",
  },
  faq_answer_3: {
    fr: "Nous prenons la sécurité des données très au sérieux. Toutes les données sont cryptées, stockées de manière sécurisée et ne sont accessibles qu'aux utilisateurs autorisés conformément à notre politique de confidentialité.",
    en: "We take data security very seriously. All data is encrypted, securely stored, and only accessible to authorized users in accordance with our privacy policy.",
  },
  faq_question_4: {
    fr: "Les enseignants peuvent-ils personnaliser les évaluations?",
    en: "Can teachers customize assessments?",
  },
  faq_answer_4: {
    fr: "Absolument! Les enseignants peuvent créer des évaluations entièrement personnalisées avec différents types de questions, niveaux de difficulté et paramètres de notation.",
    en: "Teachers can create fully customized assessments with different question types, difficulty levels, and grading parameters.",
  },
  faq_question_5: {
    fr: "Comment obtenir de l'aide si j'ai des problèmes?",
    en: "How can I get help if I have problems?",
  },
  faq_answer_5: {
    fr: "Notre équipe de support est disponible via le formulaire de contact. De plus, nous proposons une documentation détaillée et des tutoriels vidéo dans la section d'aide.",
    en: "Our support team is available via the contact form. Additionally, we offer detailed documentation and video tutorials in the help section.",
  },
  ready_to_start: {
    fr: "Prêt à commencer?",
    en: "Ready to Start?",
  },
  ready_to_start_desc: {
    fr: "Rejoignez des milliers d'étudiants et d'enseignants qui transforment leur expérience éducative avec la plateforme d'évaluation IGA.",
    en: "Join thousands of students and teachers transforming their educational experience with the IGA Assessment Platform.",
  },
  get_started_now: {
    fr: "Commencer maintenant",
    en: "Get Started Now",
  },
  satisfaction: {
    fr: "Satisfaction",
    en: "Satisfaction",
  },
  what_people_say: {
    fr: "Ce que les gens disent",
    en: "What People Say",
  },
  testimonial_1: {
    fr: "La plateforme IGA a révolutionné ma façon d'enseigner. Les analyses détaillées me permettent d'identifier rapidement les concepts que mes étudiants trouvent difficiles et d'adapter mon enseignement en conséquence.",
    en: "The IGA platform has revolutionized my teaching. The detailed analytics allow me to quickly identify concepts that my students find challenging and adapt my teaching accordingly.",
  },
  testimonial_2: {
    fr: "En tant qu'étudiante, j'apprécie énormément le feedback immédiat et les recommandations personnalisées. Cela m'a aidée à améliorer mes compétences en programmation de manière significative.",
    en: "As a student, I greatly appreciate the immediate feedback and personalized recommendations. It has helped me improve my programming skills significantly.",
  },
  testimonial_3: {
    fr: "L'intégration de cette plateforme dans notre département a considérablement amélioré nos méthodes d'évaluation et nos résultats académiques. Un outil indispensable pour l'éducation moderne.",
    en: "Integrating this platform into our department has significantly improved our assessment methods and academic outcomes. An essential tool for modern education.",
  },
  professor_computer_science: {
    fr: "Professeur d'Informatique",
    en: "Professor of Computer Science",
  },
  student_engineering: {
    fr: "Étudiante en Génie",
    en: "Engineering Student",
  },
  department_head: {
    fr: "Chef de Département",
    en: "Department Head",
  },
  why_choose_us: {
    fr: "Pourquoi nous choisir",
    en: "Why Choose Us",
  },
  innovative_platform: {
    fr: "Plateforme innovante",
    en: "Innovative Platform",
  },
  innovative_platform_desc: {
    fr: "Technologie de pointe combinée à des méthodologies pédagogiques éprouvées.",
    en: "Cutting-edge technology combined with proven pedagogical methodologies.",
  },
  expert_educators: {
    fr: "Éducateurs experts",
    en: "Expert Educators",
  },
  expert_educators_desc: {
    fr: "Développé en collaboration avec des professionnels de l'éducation expérimentés.",
    en: "Developed in collaboration with experienced education professionals.",
  },
  continuous_improvement: {
    fr: "Amélioration continue",
    en: "Continuous Improvement",
  },
  continuous_improvement_desc: {
    fr: "Mises à jour régulières basées sur les retours des utilisateurs et les avancées pédagogiques.",
    en: "Regular updates based on user feedback and pedagogical advances.",
  },
  community_support: {
    fr: "Support communautaire",
    en: "Community Support",
  },
  community_support_desc: {
    fr: "Une communauté active d'enseignants et d'étudiants partageant des ressources et des idées.",
    en: "An active community of teachers and students sharing resources and ideas.",
  },

  // Contact page translations
  contact_us: {
    fr: "Contactez-nous",
    en: "Contact Us",
  },
  contact_description: {
    fr: "Vous avez des questions ou besoin d'assistance? N'hésitez pas à nous contacter. Notre équipe est là pour vous aider.",
    en: "Have questions or need assistance? Feel free to contact us. Our team is here to help you.",
  },
  send_us_message: {
    fr: "Envoyez-nous un message",
    en: "Send Us a Message",
  },
  full_name: {
    fr: "Nom complet",
    en: "Full Name",
  },
  your_name: {
    fr: "Votre nom",
    en: "Your name",
  },
  email_address: {
    fr: "Adresse email",
    en: "Email Address",
  },
  your_email: {
    fr: "Votre email",
    en: "Your email",
  },
  subject: {
    fr: "Sujet",
    en: "Subject",
  },
  message_subject: {
    fr: "Sujet de votre message",
    en: "Subject of your message",
  },
  message: {
    fr: "Message",
    en: "Message",
  },
  your_message: {
    fr: "Votre message",
    en: "Your message",
  },
  send_message: {
    fr: "Envoyer le message",
    en: "Send Message",
  },
  please_fill_required: {
    fr: "Veuillez remplir tous les champs obligatoires.",
    en: "Please fill in all required fields.",
  },
  invalid_email: {
    fr: "Veuillez entrer une adresse email valide.",
    en: "Please enter a valid email address.",
  },
  message_sent: {
    fr: "Message envoyé!",
    en: "Message Sent!",
  },
  message_sent_description: {
    fr: "Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.",
    en: "Thank you for contacting us. We will get back to you as soon as possible.",
  },
  send_another_message: {
    fr: "Envoyer un autre message",
    en: "Send Another Message",
  },
  contact_information: {
    fr: "Informations de contact",
    en: "Contact Information",
  },
  address: {
    fr: "Adresse",
    en: "Address",
  },
  phone: {
    fr: "Téléphone",
    en: "Phone",
  },
  email: {
    fr: "Email",
    en: "Email",
  },
  office_hours: {
    fr: "Heures d'ouverture",
    en: "Office Hours",
  },
  monday_friday: {
    fr: "Lundi - Vendredi",
    en: "Monday - Friday",
  },
  saturday: {
    fr: "Samedi",
    en: "Saturday",
  },
  sunday: {
    fr: "Dimanche",
    en: "Sunday",
  },
  closed: {
    fr: "Fermé",
    en: "Closed",
  },
  follow_us: {
    fr: "Suivez-nous",
    en: "Follow Us",
  },
  faq_contact: {
    fr: "Questions fréquemment posées",
    en: "Frequently Asked Questions",
  },
  faq_contact_description: {
    fr: "Consultez notre FAQ pour trouver des réponses aux questions les plus courantes.",
    en: "Check our FAQ to find answers to the most common questions.",
  },
  view_faq: {
    fr: "Voir la FAQ",
    en: "View FAQ",
  },
  assessment_platform_tagline: {
    fr: "Plateforme d'évaluation en ligne",
    en: "Online assessment platform",
  },
  terms_agreement: {
    fr: "En vous connectant, vous acceptez nos",
    en: "By logging in, you agree to our",
  },
  finish_assessment_question: {
    fr: "Terminer l'évaluation ?",
    en: "Finish assessment?",
  },
  summative_submit_warning: {
    fr: "Attention : vous ne pourrez pas modifier vos réponses après avoir soumis cette évaluation sommative.",
    en: "Warning: you will not be able to modify your answers after submitting this summative assessment.",
  },
  practice_submit_info: {
    fr: "Vous pourrez reprendre cette évaluation d'entraînement plus tard si nécessaire.",
    en: "You can resume this training assessment later if needed.",
  },
  questions_answered: {
    fr: "Questions répondues",
    en: "Questions answered",
  },
  leave_assessment_question: {
    fr: "Quitter l'évaluation ?",
    en: "Leave assessment?",
  },
  leave_assessment_warning: {
    fr: "Attention : si vous quittez cette évaluation sommative, vos réponses seront perdues et votre tentative sera considérée comme terminée.",
    en: "Warning: if you leave this summative assessment, your answers will be lost and your attempt will be considered finished.",
  },
  leave_assessment: {
    fr: "Quitter l'évaluation",
    en: "Leave assessment",
  },
  tab_switch_detected: {
    fr: "Changement d'onglet détecté !",
    en: "Tab switch detected!",
  },
  copy_paste_disabled: {
    fr: "Copier-coller désactivé dans cette évaluation",
    en: "Copy-paste disabled in this assessment",
  },
  questions: {
    fr: "Questions",
    en: "Questions",
  },
  attempts: {
    fr: "Tentatives",
    en: "Attempts",
  },
  code: {
    fr: "Code",
    en: "Code",
  },
  restrictions: {
    fr: "Restrictions",
    en: "Restrictions",
  },
  accept_assessment_terms: {
    fr: "J'accepte les conditions d'évaluation",
    en: "I accept the assessment terms",
  },
  understand_monitoring: {
    fr: "Je comprends que cette évaluation est surveillée et que toute tentative de triche sera sanctionnée.",
    en: "I understand that this assessment is monitored and any attempt to cheat will be penalized.",
  },
  start_assessment: {
    fr: "Commencer l'évaluation",
    en: "Start assessment",
  },
  // Status indicators and assessment-related terms
  active: {
    fr: "Actif",
    en: "Active",
  },
  inactive: {
    fr: "Inactif",
    en: "Inactive",
  },
  upcoming: {
    fr: "À venir",
    en: "Upcoming",
  },
  completed: {
    fr: "Terminé",
    en: "Completed",
  },
  in_progress: {
    fr: "En cours",
    en: "In progress",
  },
  not_started: {
    fr: "Non commencé",
    en: "Not started",
  },
  expired: {
    fr: "Expiré",
    en: "Expired",
  },
  available: {
    fr: "Disponible",
    en: "Available",
  },
  not_available: {
    fr: "Non disponible",
    en: "Not available",
  },
  view_details: {
    fr: "Voir les détails",
    en: "View details",
  },
  start_now: {
    fr: "Commencer maintenant",
    en: "Start now",
  },
  continue: {
    fr: "Continuer",
    en: "Continue",
  },
  resume: {
    fr: "Reprendre",
    en: "Resume",
  },
  view: {
    fr: "Voir",
    en: "View",
  },
  edit: {
    fr: "Modifier",
    en: "Edit",
  },
  delete: {
    fr: "Supprimer",
    en: "Delete",
  },
  create_new: {
    fr: "Créer nouveau",
    en: "Create new",
  },
  create_assessment: {
    fr: "Créer une évaluation",
    en: "Create assessment",
  },
  assessment_details: {
    fr: "Détails de l'évaluation",
    en: "Assessment details",
  },
  assessment_results: {
    fr: "Résultats de l'évaluation",
    en: "Assessment results",
  },
  assessment_statistics: {
    fr: "Statistiques de l'évaluation",
    en: "Assessment statistics",
  },
  participants: {
    fr: "Participants",
    en: "Participants",
  },
  time_remaining: {
    fr: "Temps restant",
    en: "Time remaining",
  },
  expires_on: {
    fr: "Expire le",
    en: "Expires on",
  },
  average_score: {
    fr: "Note moyenne",
    en: "Average score",
  },
  access_code: {
    fr: "Code d'accès",
    en: "Access code",
  },
  general_information: {
    fr: "Informations générales",
    en: "General information",
  },
  assessment_structure: {
    fr: "Structure de l'évaluation",
    en: "Assessment structure",
  },
  participant_progress: {
    fr: "Progression des participants",
    en: "Participant progress",
  },
  overview: {
    fr: "Vue d'ensemble",
    en: "Overview",
  },
  extend_time: {
    fr: "Prolonger le temps",
    en: "Extend time",
  },
  additional_minutes: {
    fr: "Minutes supplémentaires",
    en: "Additional minutes",
  },
  current_time: {
    fr: "Temps actuel",
    en: "Current time",
  },
  new_total_time: {
    fr: "Nouveau temps total",
    en: "New total time",
  },
  minutes: {
    fr: "minutes",
    en: "minutes",
  },
  days: {
    fr: "jours",
    en: "days",
  },
  hours: {
    fr: "heures",
    en: "hours",
  },
  seconds: {
    fr: "secondes",
    en: "seconds",
  },
  based_on: {
    fr: "Basée sur",
    en: "Based on",
  },
  waiting: {
    fr: "En attente",
    en: "Waiting",
  },
  finished: {
    fr: "Terminé",
    en: "Finished",
  },
  active_restrictions: {
    fr: "Restrictions actives",
    en: "Active restrictions",
  },
  copy_paste_disabled_info: {
    fr: "Copier-coller désactivé",
    en: "Copy-paste disabled",
  },
  back_navigation_limited: {
    fr: "Navigation arrière limitée aux QCM",
    en: "Back navigation limited to MCQs",
  },
  tab_switching_monitored: {
    fr: "Changement d'onglet/fenêtre surveillé",
    en: "Tab/window switching monitored",
  },
  webcam_monitoring: {
    fr: "Surveillance par webcam activée",
    en: "Webcam monitoring enabled",
  },
  external_resources_blocked: {
    fr: "Accès aux ressources externes bloqué",
    en: "External resources access blocked",
  },
  assessment_progress: {
    fr: "Progression de l'évaluation",
    en: "Assessment progress",
  },
  completed_percentage: {
    fr: "complété",
    en: "completed",
  },
  question_of: {
    fr: "Question {current} sur {total}",
    en: "Question {current} of {total}",
  },
  multiple_choice: {
    fr: "QCM",
    en: "Multiple choice",
  },
  short_answer: {
    fr: "Réponse courte",
    en: "Short answer",
  },
  matching: {
    fr: "Appariement",
    en: "Matching",
  },
  open_ended: {
    fr: "Question ouverte",
    en: "Open-ended question",
  },
  assessment_paused: {
    fr: "Évaluation en pause",
    en: "Assessment paused",
  },
  assessment_paused_info: {
    fr: "L'évaluation est actuellement en pause. Les étudiants ne peuvent pas y accéder tant qu'elle n'est pas reprise.",
    en: "The assessment is currently paused. Students cannot access it until it is resumed.",
  },
  pause_assessment: {
    fr: "Mettre en pause",
    en: "Pause assessment",
  },
  resume_assessment: {
    fr: "Reprendre l'évaluation",
    en: "Resume assessment",
  },
  view_statistics: {
    fr: "Voir les statistiques",
    en: "View statistics",
  },
  share: {
    fr: "Partager",
    en: "Share",
  },
  duplicate: {
    fr: "Dupliquer",
    en: "Duplicate",
  },
  export: {
    fr: "Exporter",
    en: "Export",
  },
  preview: {
    fr: "Prévisualiser",
    en: "Preview",
  },
  actions: {
    fr: "Actions",
    en: "Actions",
  },
  save_settings: {
    fr: "Enregistrer les paramètres",
    en: "Save settings",
  },
  general_settings: {
    fr: "Paramètres généraux",
    en: "General settings",
  },
  shuffle_questions: {
    fr: "Mélanger les questions",
    en: "Shuffle questions",
  },
  shuffle_questions_desc: {
    fr: "Les questions seront présentées dans un ordre aléatoire à chaque étudiant",
    en: "Questions will be presented in a random order to each student",
  },
  prevent_back_navigation: {
    fr: "Empêcher le retour en arrière",
    en: "Prevent back navigation",
  },
  prevent_back_desc: {
    fr: "Les étudiants ne pourront pas revenir aux questions précédentes",
    en: "Students will not be able to return to previous questions",
  },
  show_results_immediately: {
    fr: "Afficher les résultats immédiatement",
    en: "Show results immediately",
  },
  show_results_desc: {
    fr: "Les étudiants verront leurs résultats dès qu'ils auront terminé l'évaluation",
    en: "Students will see their results as soon as they complete the assessment",
  },
  allow_retake: {
    fr: "Autoriser les reprises",
    en: "Allow retakes",
  },
  allow_retake_desc: {
    fr: "Les étudiants pourront reprendre l'évaluation plusieurs fois",
    en: "Students will be able to retake the assessment multiple times",
  },
  student_list: {
    fr: "Liste des participants",
    en: "Participant list",
  },
  export_results: {
    fr: "Exporter les résultats",
    en: "Export results",
  },
  student_name: {
    fr: "Étudiant",
    en: "Student",
  },
  status: {
    fr: "Statut",
    en: "Status",
  },
  time_spent: {
    fr: "Temps passé",
    en: "Time spent",
  },
  score: {
    fr: "Score",
    en: "Score",
  },
  details: {
    fr: "Détails",
    en: "Details",
  },
  assessment_questions: {
    fr: "Questions de l'évaluation",
    en: "Assessment questions",
  },
  edit_questions: {
    fr: "Modifier les questions",
    en: "Edit questions",
  },
  points: {
    fr: "pts",
    en: "pts",
  },
  point: {
    fr: "pt",
    en: "pt",
  },
  title: {
    fr: "Titre",
    en: "Title",
  },
  creation_date: {
    fr: "Date de création",
    en: "Creation date",
  },
  expiry_date: {
    fr: "Date d'expiration",
    en: "Expiry date",
  },
  description: {
    fr: "Description",
    en: "Description",
  },
  number_of_questions: {
    fr: "Nombre de questions",
    en: "Number of questions",
  },
  total_points: {
    fr: "Points totaux",
    en: "Total points",
  },
  time_limit: {
    fr: "Temps limite",
    en: "Time limit",
  },
  back_navigation: {
    fr: "Navigation arrière",
    en: "Back navigation",
  },
  immediate_results: {
    fr: "Résultats immédiats",
    en: "Immediate results",
  },
  yes: {
    fr: "Oui",
    en: "Yes",
  },
  no: {
    fr: "Non",
    en: "No",
  },
  enabled: {
    fr: "Activée",
    en: "Enabled",
  },
  disabled: {
    fr: "Désactivée",
    en: "Disabled",
  },
  course: {
    fr: "Cours",
    en: "Course",
  },
  exercise: {
    fr: "Exercice",
    en: "Exercise",
  },
  recovery_plan: {
    fr: "Plan de récupération",
    en: "Recovery plan",
  },
  progress: {
    fr: "Progression",
    en: "Progress",
  },
  feedback: {
    fr: "Commentaires",
    en: "Feedback",
  },
  subject: {
    fr: "Matière",
    en: "Subject",
  },
  assessment_settings: {
    fr: "Paramètres de l'évaluation",
    en: "Assessment settings",
  },
  view_assessments: {
    fr: "Consultez vos évaluations.",
    en: "View your assessments.",
  },
  welcome: {
    fr: "Bienvenue",
    en: "Welcome",
  },
  day: {
    fr: "jour",
    en: "day",
  },
  days: {
    fr: "jours",
    en: "days",
  },
  expires_in: {
    fr: "Expire dans",
    en: "Expires in",
  },
  starts_in: {
    fr: "Commence dans",
    en: "Starts in",
  },
  view_corrections: {
    fr: "Voir les corrections",
    en: "View corrections",
  },
  mcq: {
    fr: "QCM",
    en: "MCQ",
  },
  open_questions: {
    fr: "Questions ouvertes",
    en: "Open questions",
  },
  sort_recent: {
    fr: "Plus récentes",
    en: "Most recent",
  },
  sort_oldest: {
    fr: "Plus anciennes",
    en: "Oldest first",
  },
  sort_title_asc: {
    fr: "Titre (A-Z)",
    en: "Title (A-Z)",
  },
  sort_title_desc: {
    fr: "Titre (Z-A)",
    en: "Title (Z-A)",
  },
  sort_name_asc: {
    fr: "Nom (A-Z)",
    en: "Name (A-Z)",
  },
  sort_name_desc: {
    fr: "Nom (Z-A)",
    en: "Name (Z-A)",
  },
  sort_participants: {
    fr: "Participants",
    en: "Participants",
  },
  no_assessments_found: {
    fr: "Aucune évaluation trouvée",
    en: "No assessments found",
  },
  student_dashboard: {
    fr: "sur votre tableau de bord étudiant",
    en: "to your student dashboard",
  },
  start: {
    fr: "Commencer",
    en: "Start",
  },
  correct_questions: {
    fr: "Questions correctes",
    en: "Correct questions",
  },
  manage_assessments: {
    fr: "Gérez toutes vos évaluations et suivez leur progression",
    en: "Manage all your assessments and track their progress",
  },
  draft: {
    fr: "Brouillons",
    en: "Drafts",
  },
  summary: {
    fr: "Résumé",
    en: "Summary",
  },
  overall_performance: {
    fr: "Votre performance globale",
    en: "Your overall performance",
  },
  questions_and_answers: {
    fr: "Questions & Réponses",
    en: "Questions & Answers",
  },
  excellent: {
    fr: "Excellent!",
    en: "Excellent!",
  },
  very_good: {
    fr: "Très bien!",
    en: "Very good!",
  },
  good: {
    fr: "Bien",
    en: "Good",
  },
  fair: {
    fr: "Passable",
    en: "Fair",
  },
  needs_improvement: {
    fr: "À améliorer",
    en: "Needs improvement",
  },
  congratulations_message: {
    fr: "Félicitations! Vous avez bien réussi cette évaluation.",
    en: "Congratulations! You did well on this assessment.",
  },
  improvement_message: {
    fr: "Vous avez des points à améliorer. Consultez les recommandations.",
    en: "You have areas to improve. Check the recommendations.",
  },
  date: {
    fr: "Date",
    en: "Date",
  },
  personalized_recommendations: {
    fr: "Recommandations personnalisées",
    en: "Personalized recommendations",
  },
  recommendations_based_on_performance: {
    fr: "Basées sur votre performance, voici des ressources pour vous aider à progresser.",
    en: "Based on your performance, here are resources to help you progress.",
  },
  access_resource: {
    fr: "Accéder à la ressource",
    en: "Access resource",
  },
  back_to_dashboard: {
    fr: "Retour au tableau de bord",
    en: "Back to dashboard",
  },
  and: {
    fr: "et",
    en: "and",
  },
  resources_tailored_to_profile: {
    fr: "Ressources adaptées à votre profil",
    en: "Resources tailored to your profile",
  },
  recommended_resources: {
    fr: "Ressources recommandées",
    en: "Recommended resources",
  },
  skills_to_improve: {
    fr: "Compétences à améliorer",
    en: "Skills to improve",
  },
  based_on_recent_assessments: {
    fr: "Basé sur vos performances aux évaluations récentes",
    en: "Based on your performance in recent assessments",
  },
  mastered: {
    fr: "Maîtrisé",
    en: "Mastered",
  },
  view_learning_resources: {
    fr: "Voir les ressources d'apprentissage",
    en: "View learning resources",
  },
  light_mode: {
    fr: "Mode clair",
    en: "Light mode",
  },
  dark_mode: {
    fr: "Mode sombre",
    en: "Dark mode",
  },
  your_answer: {
    fr: "Votre réponse",
    en: "Your answer",
  },
  correct_answer: {
    fr: "Réponse correcte",
    en: "Correct answer",
  },
  professor: {
    fr: "Professeur",
    en: "Professor",
  },
  please_enter_email: {
    fr: "Veuillez saisir votre adresse email",
    en: "Please enter your email address",
  },
  please_use_iga_email: {
    fr: "Veuillez utiliser votre adresse email IGA (@iga.ac.ma ou @etud.iga.ac.ma)",
    en: "Please use your IGA email address (@iga.ac.ma or @etud.iga.ac.ma)",
  },
  reset_email_sent: {
    fr: "Un email de réinitialisation a été envoyé à {email}. Veuillez vérifier votre boîte de réception.",
    en: "A reset email has been sent to {email}. Please check your inbox.",
  },
  email_placeholder: {
    fr: "nom@iga.ac.ma ou nom@etud.iga.ac.ma",
    en: "name@iga.ac.ma or name@etud.iga.ac.ma",
  },
  password_recovery: {
    fr: "Récupération de mot de passe",
    en: "Password Recovery",
  },
  enter_email_reset: {
    fr: "Entrez votre email pour réinitialiser votre mot de passe",
    en: "Enter your email to reset your password",
  },
  if_not_received: {
    fr: "Si vous ne recevez pas l'email :",
    en: "If you don't receive the email:",
  },
  check_spam: {
    fr: "Vérifiez votre dossier spam/indésirables",
    en: "Check your spam/junk folder",
  },
  verify_email: {
    fr: "Vérifiez que l'adresse email est correcte",
    en: "Verify that the email address is correct",
  },
  contact_support: {
    fr: "Contactez le support technique",
    en: "Contact technical support",
  },
  send_reset_link: {
    fr: "Envoyer le lien de réinitialisation",
    en: "Send reset link",
  },
  back_to_login: {
    fr: "Retour à la connexion",
    en: "Back to login",
  },
  student_management: {
    fr: "Gestion des étudiants",
    en: "Student Management",
  },
  view_manage_students: {
    fr: "Consultez et gérez les étudiants de vos classes",
    en: "View and manage students in your classes",
  },
  add_students: {
    fr: "Ajouter des étudiants",
    en: "Add students",
  },
  total_students: {
    fr: "Total étudiants",
    en: "Total students",
  },
  across_classes: {
    fr: "Répartis sur 5 classes",
    en: "Across 5 classes",
  },
  average_grade: {
    fr: "Moyenne générale",
    en: "Average grade",
  },
  since_last_semester: {
    fr: "+0.8 depuis le dernier semestre",
    en: "+0.8 since last semester",
  },
  success_rate: {
    fr: "Taux de réussite",
    en: "Success rate",
  },
  since_last_semester_plus: {
    fr: "+5% depuis le dernier semestre",
    en: "+5% since last semester",
  },
  assessments_taken: {
    fr: "Évaluations passées",
    en: "Assessments taken",
  },
  this_semester: {
    fr: "Ce semestre",
    en: "This semester",
  },
  all_students: {
    fr: "Tous les étudiants",
    en: "All students",
  },
  first_year: {
    fr: "1ère année",
    en: "1st year",
  },
  second_year: {
    fr: "2ème année",
    en: "2nd year",
  },
  third_year: {
    fr: "3ème année",
    en: "3rd year",
  },
  third_year_students: {
    fr: "Étudiants de 3ème année",
    en: "Third year students",
  },
  second_year_students: {
    fr: "Étudiants de 2ème année",
    en: "Second year students",
  },
  first_year_students: {
    fr: "Étudiants de 1ère année",
    en: "First year students",
  },
  all_third_year_students: {
    fr: "Tous les étudiants inscrits en 3ème année",
    en: "All students enrolled in third year",
  },
  all_second_year_students: {
    fr: "Tous les étudiants inscrits en 2ème année",
    en: "All students enrolled in second year",
  },
  all_first_year_students: {
    fr: "Tous les étudiants inscrits en 1ère année",
    en: "All students enrolled in first year",
  },
  student_list: {
    fr: "Liste des étudiants",
    en: "Student list",
  },
  export: {
    fr: "Exporter",
    en: "Export",
  },
  all_enrolled_students: {
    fr: "Tous les étudiants inscrits à vos cours",
    en: "All students enrolled in your courses",
  },
  name: {
    fr: "Nom",
    en: "Name",
  },
  average: {
    fr: "Moyenne",
    en: "Average",
  },
  assessments: {
    fr: "Évaluations",
    en: "Assessments",
  },
  actions: {
    fr: "Actions",
    en: "Actions",
  },
  my_evaluations: {
    fr: "Mes évaluations",
    en: "My evaluations",
  },
  evaluations: {
    fr: "Évaluations",
    en: "Evaluations",
  },
  create_evaluation: {
    fr: "Créer une évaluation",
    en: "Create evaluation",
  },
  create_new_evaluation: {
    fr: "Créer une nouvelle évaluation",
    en: "Create new evaluation",
  },
  create_evaluation_description: {
    fr: "Définissez les paramètres de base de votre nouvelle évaluation",
    en: "Define the basic parameters of your new evaluation",
  },
  evaluation_title_placeholder: {
    fr: "Titre de l'évaluation",
    en: "Evaluation title",
  },
  evaluation_type: {
    fr: "Type d'évaluation",
    en: "Evaluation type",
  },
  select_evaluation_type: {
    fr: "Sélectionner le type d'évaluation",
    en: "Select evaluation type",
  },
  summative: {
    fr: "Sommative",
    en: "Summative",
  },
  formative: {
    fr: "Formative",
    en: "Formative",
  },
  practice: {
    fr: "Entraînement",
    en: "Practice",
  },
  evaluation_description_placeholder: {
    fr: "Description de l'évaluation",
    en: "Evaluation description",
  },
  due_date: {
    fr: "Date d'échéance",
    en: "Due date",
  },
  create: {
    fr: "Créer",
    en: "Create",
  },
  sort_due_date: {
    fr: "Date d'échéance",
    en: "Due date",
  },
  created: {
    fr: "Créé le",
    en: "Created",
  },
  due: {
    fr: "Échéance",
    en: "Due",
  },
  not_published: {
    fr: "Non publié",
    en: "Not published",
  },
  participation: {
    fr: "Participation",
    en: "Participation",
  },
  completed_on: {
    fr: "Terminé le",
    en: "Completed on",
  },
  continue_editing: {
    fr: "Continuer l'édition",
    en: "Continue editing",
  },
  publish: {
    fr: "Publier",
    en: "Publish",
  },
  download: {
    fr: "Télécharger",
    en: "Download",
  },
  view_analysis: {
    fr: "Voir l'analyse",
    en: "View analysis",
  },
  active_participants: {
    fr: "Participants actifs",
    en: "Active participants",
  },
  extend_time: {
    fr: "Prolonger le temps",
    en: "Extend time",
  },
  extend_time_description: {
    fr: "Ajoutez du temps supplémentaire pour cette évaluation",
    en: "Add extra time for this evaluation",
  },
  confirm: {
    fr: "Confirmer",
    en: "Confirm",
  },
  total_points: {
    fr: "Points totaux",
    en: "Total points",
  },
  copy_code: {
    fr: "Copier le code",
    en: "Copy code",
  },
  active_restrictions_description: {
    fr: "Restrictions appliquées à cette évaluation",
    en: "Restrictions applied to this evaluation",
  },
  copy_paste_disabled_description: {
    fr: "Les étudiants ne peuvent pas copier-coller pendant l'évaluation",
    en: "Students cannot copy-paste during the evaluation",
  },
  back_navigation_description: {
    fr: "Les étudiants ne peuvent pas revenir aux questions précédentes",
    en: "Students cannot go back to previous questions",
  },
  tab_switching_description: {
    fr: "Les changements d'onglet sont enregistrés et signalés",
    en: "Tab switching is recorded and flagged",
  },
  immediate_results_description: {
    fr: "Les résultats sont affichés immédiatement après soumission",
    en: "Results are displayed immediately after submission",
  },
  participant_progress_description: {
    fr: "Progression des participants à l'évaluation",
    en: "Progress of evaluation participants",
  },
  student_list_description: {
    fr: "Liste des étudiants participant à cette évaluation",
    en: "List of students participating in this evaluation",
  },
  assessment_questions_description: {
    fr: "Questions incluses dans cette évaluation",
    en: "Questions included in this evaluation",
  },
  assessment_settings_description: {
    fr: "Paramètres et configuration de l'évaluation",
    en: "Evaluation settings and configuration",
  },
  point: {
    fr: "pt",
    en: "pt",
  },
  points: {
    fr: "pts",
    en: "pts",
  },
  speciality: {
    fr: "Spécialité",
    en: "Speciality",
  },
  group: {
    fr: "Groupe",
    en: "Group",
  },
  view_profile: {
    fr: "Voir le profil",
    en: "View profile",
  },
  send_message: {
    fr: "Envoyer un message",
    en: "Send message",
  },
  remove_from_course: {
    fr: "Retirer du cours",
    en: "Remove from course",
  },
  export_student_data: {
    fr: "Exporter les données des étudiants",
    en: "Export student data",
  },
  export_student_data_description: {
    fr: "Téléchargez les données des étudiants dans un format exploitable",
    en: "Download student data in a usable format",
  },
  export_format_description: {
    fr: "Les données seront exportées au format CSV, compatible avec Excel et d'autres tableurs.",
    en: "Data will be exported in CSV format, compatible with Excel and other spreadsheets.",
  },
  download_assessment: {
    fr: "Télécharger l'évaluation",
    en: "Download assessment",
  },
  download_assessment_description: {
    fr: "Téléchargez les données de cette évaluation",
    en: "Download data for this assessment",
  },
  download_format_description: {
    fr: "Les données seront téléchargées au format PDF et CSV pour une analyse approfondie.",
    en: "Data will be downloaded in PDF and CSV formats for in-depth analysis.",
  },
  assessment_analysis: {
    fr: "Analyse de l'évaluation",
    en: "Assessment analysis",
  },
  view_assessment_analysis_description: {
    fr: "Consultez l'analyse détaillée des résultats de cette évaluation",
    en: "View detailed analysis of this assessment's results",
  },
  redirecting_to_analysis_page: {
    fr: "Redirection vers la page d'analyse...",
    en: "Redirecting to analysis page...",
  },
  view_assessment_details_description: {
    fr: "Consultez les détails de cette évaluation",
    en: "View details of this assessment",
  },
  redirecting_to_assessment_details: {
    fr: "Redirection vers les détails de l'évaluation...",
    en: "Redirecting to assessment details...",
  },
  view_assessment_results_description: {
    fr: "Consultez les résultats de cette évaluation",
    en: "View results of this assessment",
  },
  redirecting_to_results_page: {
    fr: "Redirection vers la page de résultats...",
    en: "Redirecting to results page...",
  },
  active_assessments_change_text: {
    fr: "+2 depuis la semaine dernière",
    en: "+2 since last week",
  },
  students_change_text: {
    fr: "+15 depuis le dernier mois",
    en: "+15 since last month",
  },
  score_change_text: {
    fr: "+0.5 depuis la dernière évaluation",
    en: "+0.5 since last assessment",
  },
  math_exam_text: {
    fr: "Examen de mathématiques",
    en: "Mathematics exam",
  },

  // Results page translations
  view_student_performance: {
    fr: "Voir la performance des étudiants",
    en: "View student performance",
  },
  average_time: {
    fr: "Temps moyen",
    en: "Average time",
  },
  allocated_minutes: {
    fr: "minutes allouées",
    en: "allocated minutes",
  },
  grade_distribution: {
    fr: "Distribution des notes",
    en: "Grade distribution",
  },
  class_grade_distribution: {
    fr: "Distribution des notes de la classe",
    en: "Class grade distribution",
  },
  skill_performance: {
    fr: "Performance par compétence",
    en: "Skill performance",
  },
  mastered_skills_analysis: {
    fr: "Analyse des compétences maîtrisées",
    en: "Mastered skills analysis",
  },
  grade_distribution_chart: {
    fr: "Graphique de distribution des notes",
    en: "Grade distribution chart",
  },
  skills_radar_chart: {
    fr: "Graphique radar des compétences",
    en: "Skills radar chart",
  },
  ai_generated_insights: {
    fr: "Analyses générées par IA",
    en: "AI-generated insights",
  },
  strengths: {
    fr: "Points forts",
    en: "Strengths",
  },
  oop_concepts_mastered: {
    fr: "Concepts POO maîtrisés",
    en: "OOP concepts mastered",
  },
  inheritance_polymorphism_high_scores: {
    fr: "Scores élevés en héritage et polymorphisme",
    en: "High scores in inheritance and polymorphism",
  },
  prime_algorithm_success: {
    fr: "Succès avec l'algorithme des nombres premiers",
    en: "Success with prime number algorithm",
  },
  areas_to_improve: {
    fr: "Domaines à améliorer",
    en: "Areas to improve",
  },
  interface_abstract_confusion: {
    fr: "Confusion entre interfaces et classes abstraites",
    en: "Confusion between interfaces et abstract classes",
  },
  advanced_polymorphism_needs_examples: {
    fr: "Polymorphisme avancé nécessite plus d'exemples",
    en: "Advanced polymorphism needs more examples",
  },
  algorithm_optimization_difficulties: {
    fr: "Difficultés avec l'optimisation des algorithmes",
    en: "Difficulties with algorithm optimization",
  },
  comparison_with_previous: {
    fr: "Comparaison avec précédent",
    en: "Comparison with previous",
  },
  improvement_from_previous: {
    fr: "Amélioration par rapport au précédent",
    en: "Improvement from previous",
  },

  // Statistics page translations
  assessment_performance_analysis: {
    fr: "Analyse de performance des évaluations",
    en: "Assessment performance analysis",
  },
  recent_assessments: {
    fr: "évaluations récentes",
    en: "recent assessments",
  },
  across_3_levels: {
    fr: "répartis sur 3 niveaux",
    en: "across 3 levels",
  },
  completion_rate: {
    fr: "Taux de complétion",
    en: "Completion rate",
  },
  compared_to_previous_semester: {
    fr: "comparé au semestre précédent",
    en: "compared to previous semester",
  },
  performance_overview_by_assessment: {
    fr: "Aperçu des performances par évaluation",
    en: "Performance overview by assessment",
  },
  avg_score: {
    fr: "note moyenne",
    en: "avg. score",
  },
  avg_time: {
    fr: "temps moyen",
    en: "avg. time",
  },

  // Assessments page translations
  my_assessments: {
    fr: "Mes évaluations",
    en: "My assessments",
  },
  all_subjects: {
    fr: "Toutes les matières",
    en: "All subjects",
  },
  "1_day": {
    fr: "1 jour",
    en: "1 day",
  },
  "2_days": {
    fr: "2 jours",
    en: "2 days",
  },
  "3_days": {
    fr: "3 jours",
    en: "3 days",
  },
  fourth_year: {
    fr: "4ème année",
    en: "4th year",
  },

  // Settings page translations
  teaching_preferences: {
    fr: "Préférences d'enseignement",
    en: "Teaching preferences",
  },
  configure_teaching_preferences: {
    fr: "Configurez vos préférences d'enseignement",
    en: "Configure your teaching preferences",
  },
  assessment_defaults: {
    fr: "Paramètres par défaut des évaluations",
    en: "Assessment defaults",
  },
  auto_publish_results: {
    fr: "Publication automatique des résultats",
    en: "Auto-publish results",
  },
  automatically_publish_results: {
    fr: "Publier automatiquement les résultats des évaluations",
    en: "Automatically publish assessment results",
  },
  show_statistics_to_students: {
    fr: "Montrer les statistiques aux étudiants",
    en: "Show statistics to students",
  },
  allow_students_to_see_statistics: {
    fr: "Permettre aux étudiants de voir les statistiques des évaluations",
    en: "Allow students to see assessment statistics",
  },
  default_assessment_time: {
    fr: "Durée par défaut des évaluations",
    en: "Default assessment time",
  },
  grading_preferences: {
    fr: "Préférences de notation",
    en: "Grading preferences",
  },
  grading_scale: {
    fr: "Échelle de notation",
    en: "Grading scale",
  },
  select_grading_scale: {
    fr: "Sélectionner l'échelle de notation",
    en: "Select grading scale",
  },
  out_of_20: {
    fr: "Sur 20",
    en: "Out of 20",
  },
  percentage: {
    fr: "Pourcentage",
    en: "Percentage",
  },
  letter_grades: {
    fr: "Notes alphabétiques",
    en: "Letter grades",
  },
  curve_grades: {
    fr: "Courber les notes",
    en: "Curve grades",
  },
  automatically_curve_grades: {
    fr: "Appliquer automatiquement une courbe aux notes",
    en: "Automatically curve grades",
  },
  settings_saved_successfully: {
    fr: "Paramètres enregistrés avec succès",
    en: "Settings saved successfully",
  },
  last_active: {
    fr: "Dernière activité",
    en: "Last active",
  },
  new_submissions: {
    fr: "Nouvelles soumissions",
    en: "New submissions",
  },
  receive_email_new_submission: {
    fr: "Recevoir un email pour chaque nouvelle soumission",
    en: "Receive an email for each new submission",
  },
  assessment_results: {
    fr: "Résultats d'évaluation",
    en: "Assessment results",
  },
  receive_email_results_published: {
    fr: "Recevoir un email quand les résultats sont publiés",
    en: "Receive an email when results are published",
  },
  receive_reminders_upcoming_assessments: {
    fr: "Recevoir des rappels pour les évaluations à venir",
    en: "Receive reminders for upcoming assessments",
  },
  receive_notification_new_submission: {
    fr: "Recevoir une notification pour chaque nouvelle soumission",
    en: "Receive a notification for each new submission",
  },
  receive_notification_results_published: {
    fr: "Recevoir une notification quand les résultats sont publiés",
    en: "Receive a notification when results are published",
  },

  // Statistics page translations
  all_periods: {
    fr: "Toutes les périodes",
    en: "All periods",
  },
  period: {
    fr: "Période",
    en: "Period",
  },

  // Results page translations
  exporting_results_data: {
    fr: "Exportation des données de résultats",
    en: "Exporting results data",
  },
  export_results_description: {
    fr: "Exportez les résultats de cette évaluation",
    en: "Export the results of this assessment",
  },
  export_results_format_description: {
    fr: "Les données seront exportées au format CSV, compatible avec Excel et d'autres tableurs.",
    en: "Data will be exported in CSV format, compatible with Excel and other spreadsheets.",
  },
  by_student: {
    fr: "Par étudiant",
    en: "By student",
  },
  by_question: {
    fr: "Par question",
    en: "By question",
  },
  ai_recommendations: {
    fr: "Recommandations IA",
    en: "AI recommendations",
  },
  student_performance: {
    fr: "Performance des étudiants",
    en: "Student performance",
  },
  individual_results_progress: {
    fr: "Résultats individuels et progression",
    en: "Individual results and progress",
  },
  min: {
    fr: "min",
    en: "min",
  },
  question_analysis: {
    fr: "Analyse des questions",
    en: "Question analysis",
  },
  student_performance_by_question: {
    fr: "Performance des étudiants par question",
    en: "Student performance by question",
  },
  question_improvement_recommendations: {
    fr: "Recommandations d'amélioration des questions",
    en: "Question improvement recommendations",
  },
  ai_suggestions_for_future: {
    fr: "Suggestions IA pour les futures évaluations",
    en: "AI suggestions for future assessments",
  },
  questions_to_rephrase: {
    fr: "Questions à reformuler",
    en: "Questions to rephrase",
  },
  difficulty_adjustment: {
    fr: "Ajustement de la difficulté",
    en: "Difficulty adjustment",
  },
  pedagogical_recommendations: {
    fr: "Recommandations pédagogiques",
    en: "Pedagogical recommendations",
  },
  personalized_suggestions_based_on_results: {
    fr: "Suggestions personnalisées basées sur les résultats",
    en: "Personalized suggestions based on results",
  },
  recommended_resources_for_class: {
    fr: "Ressources recommandées pour la classe",
    en: "Recommended resources for class",
  },
  identified_student_groups: {
    fr: "Groupes d'étudiants identifiés",
    en: "Identified student groups",
  },
  group_1_excellent: {
    fr: "Groupe 1: Excellent",
    en: "Group 1: Excellent",
  },
  group_2_good: {
    fr: "Groupe 2: Bon",
    en: "Group 2: Good",
  },
  group_3_struggling: {
    fr: "Groupe 3: En difficulté",
    en: "Group 3: Struggling",
  },
  excellent_group_description: {
    fr: "Ces étudiants maîtrisent tous les concepts et pourraient bénéficier de défis supplémentaires.",
    en: "These students master all concepts and could benefit from additional challenges.",
  },
  good_group_description: {
    fr: "Ces étudiants ont une bonne compréhension mais pourraient bénéficier d'exercices supplémentaires sur certains concepts.",
    en: "These students have a good understanding but could benefit from additional exercises on certain concepts.",
  },
  struggling_group_description: {
    fr: "Ces étudiants ont besoin d'un soutien supplémentaire, particulièrement sur les concepts fondamentaux.",
    en: "These students need additional support, particularly on fundamental concepts.",
  },
  apply_recommendations: {
    fr: "Appliquer les recommandations",
    en: "Apply recommendations",
  },

  // Assessments page translations
  filter_by_subject: {
    fr: "Filtrer par matière",
    en: "Filter by subject",
  },
  programming: {
    fr: "Programmation",
    en: "Programming",
  },
  databases: {
    fr: "Bases de données",
    en: "Databases",
  },
  networks: {
    fr: "Réseaux",
    en: "Networks",
  },
  mathematics: {
    fr: "Mathématiques",
    en: "Mathematics",
  },
  artificial_intelligence: {
    fr: "Intelligence artificielle",
    en: "Artificial intelligence",
  },
  java_programming_final_exam: {
    fr: "Examen final de programmation Java",
    en: "Java programming final exam",
  },
  database_continuous_assessment: {
    fr: "Évaluation continue de bases de données",
    en: "Database continuous assessment",
  },
  computer_networks_mcq: {
    fr: "QCM de réseaux informatiques",
    en: "Computer networks MCQ",
  },
  artificial_intelligence_project: {
    fr: "Projet d'intelligence artificielle",
    en: "Artificial intelligence project",
  },
  mathematics_midterm_exam: {
    fr: "Examen de mi-semestre de mathématiques",
    en: "Mathematics midterm exam",
  },
  algorithms_final_exam: {
    fr: "Examen final d'algorithmes",
    en: "Algorithms final exam",
  },
  code_copied_to_clipboard: {
    fr: "Code copié dans le presse-papiers",
    en: "Code copied to clipboard",
  },
  error_copying_code: {
    fr: "Erreur lors de la copie du code",
    en: "Error copying code",
  },
  menu: {
    fr: "Menu",
    en: "Menu",
  },
  code_copied_to_clipboard: {
    fr: "Code copié dans le presse-papiers",
    en: "Code copied to clipboard",
  },
  error_copying_code: {
    fr: "Erreur lors de la copie du code",
    en: "Error copying code",
  },

  // Assessment editing
  edit_assessment: {
    fr: "Modifier l'évaluation",
    en: "Edit Assessment",
  },
  assessment_updated_success: {
    fr: "Évaluation mise à jour avec succès !",
    en: "Assessment updated successfully!",
  },
  loading_assessment: {
    fr: "Chargement de l'évaluation...",
    en: "Loading assessment...",
  },
  zero_for_no_time_limit: {
    fr: "Entrez 0 pour aucune limite de temps",
    en: "Enter 0 for no time limit",
  },
  no_time_limit: {
    fr: "Pas de limite de temps",
    en: "No time limit",
  },

  // Download functionality
  download: {
    fr: "Télécharger",
    en: "Download",
  },
  basic_information: {
    fr: "Informations de base",
    en: "Basic Information",
  },
  basic_information_about_evaluation: {
    fr: "Informations de base concernant l'évaluation",
    en: "Basic information about the evaluation",
  },
  evaluation_title: {
    fr: "Titre de l'évaluation",
    en: "Evaluation Title",
  },
  duration: {
    fr: "Durée",
    en: "Duration",
  },
  add_edit_questions: {
    fr: "Ajouter ou modifier des questions",
    en: "Add or edit questions",
  },
  configure_evaluation_behavior: {
    fr: "Configurer le comportement de l'évaluation",
    en: "Configure evaluation behavior",
  },
  edit_evaluation: {
    fr: "Modifier l'évaluation",
    en: "Edit Evaluation",
  },
  edit_evaluation_description: {
    fr: "Modifiez les paramètres de cette évaluation",
    en: "Modify the parameters of this evaluation",
  },
  evaluation_saved: {
    fr: "Évaluation enregistrée",
    en: "Evaluation saved",
  },
  evaluation_published: {
    fr: "Évaluation publiée",
    en: "Evaluation published",
  },
  save_evaluation_description: {
    fr: "Enregistrer cette évaluation pour une utilisation ultérieure",
    en: "Save this evaluation for later use",
  },
  save_as_draft_message: {
    fr: "L'évaluation sera enregistrée comme brouillon et ne sera pas visible par les étudiants.",
    en: "The evaluation will be saved as a draft and won't be visible to students.",
  },
  publish_evaluation_description: {
    fr: "Publier cette évaluation pour les étudiants",
    en: "Publish this evaluation for students",
  },
  publish_confirmation_message: {
    fr: "Une fois publiée, l'évaluation sera accessible aux étudiants avec le code d'accès.",
    en: "Once published, the evaluation will be accessible to students with the access code.",
  },
  warning_no_questions: {
    fr: "Attention : cette évaluation ne contient aucune question.",
    en: "Warning: this evaluation doesn't contain any questions.",
  },
  evaluation_preview: {
    fr: "Aperçu de l'évaluation",
    en: "Evaluation Preview",
  },
  preview_description: {
    fr: "Voici un aperçu de l'évaluation telle qu'elle apparaîtra aux étudiants.",
    en: "Here's a preview of the evaluation as it will appear to students.",
  },
  untitled_evaluation: {
    fr: "Évaluation sans titre",
    en: "Untitled Evaluation",
  },
  total_questions: {
    fr: "Questions totales",
    en: "Total questions",
  },
  no_question_text: {
    fr: "Aucun texte de question",
    en: "No question text",
  },
  select_match: {
    fr: "Sélectionner une correspondance",
    en: "Select match",
  },
  no_questions_to_preview: {
    fr: "Aucune question à prévisualiser",
    en: "No questions to preview",
  },
  no_questions_added: {
    fr: "Aucune question ajoutée",
    en: "No questions added",
  },
  click_buttons_to_add: {
    fr: "Cliquez sur les boutons ci-dessus pour ajouter des questions",
    en: "Click the buttons above to add questions",
  },
  enter_question_text: {
    fr: "Entrez le texte de la question",
    en: "Enter question text",
  },
  option: {
    fr: "Option",
    en: "Option",
  },
  enter_expected_answer: {
    fr: "Entrez la réponse attendue",
    en: "Enter expected answer",
  },
  matching_items: {
    fr: "Éléments à associer",
    en: "Matching items",
  },
  add_item: {
    fr: "Ajouter un élément",
    en: "Add item",
  },
  item: {
    fr: "Élément",
    en: "Item",
  },
  match: {
    fr: "Correspondance",
    en: "Match",
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "fr" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language]
    }
    // For development: log missing translations to console
    console.warn(`Translation missing for key: ${key}`)

    // Instead of returning the raw key, try to make it more readable
    // Convert snake_case to Title Case
    return key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
