
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Play, 
  Search, 
  Clock, 
  ThumbsUp, 
  Bookmark, 
  FilterX, 
  CheckCircle, 
  ArrowRight,
  Lightbulb,
  Award
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Mock data for educational resources
const featuredCourses = [
  {
    id: "course-1",
    title: "Financial Foundations: Budgeting 101",
    description: "Learn the fundamentals of creating and sticking to a budget that works for you",
    level: "Beginner",
    duration: "45 mins",
    modules: 5,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    progress: 65
  },
  {
    id: "course-2",
    title: "Investment Strategies for Long-term Growth",
    description: "Understand various investment vehicles and strategies for wealth building",
    level: "Intermediate",
    duration: "2 hours",
    modules: 8,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    progress: 10
  },
  {
    id: "course-3",
    title: "Debt Management & Credit Score Optimization",
    description: "Strategies to manage debt effectively and improve your credit score",
    level: "Beginner",
    duration: "1.5 hours",
    modules: 6,
    image: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    progress: 0
  }
];

const articles = [
  {
    id: "article-1",
    title: "The 50/30/20 Rule for Budgeting Success",
    description: "Learn how to divide your income into needs, wants, and savings for financial balance",
    category: "Budgeting",
    readTime: "8 min read",
    date: "2025-04-01",
    likes: 324,
    bookmarked: true
  },
  {
    id: "article-2",
    title: "Understanding ETFs vs Mutual Funds",
    description: "A comprehensive comparison to help you choose the right investment vehicle",
    category: "Investing",
    readTime: "12 min read",
    date: "2025-03-25",
    likes: 187,
    bookmarked: false
  },
  {
    id: "article-3",
    title: "Emergency Fund: How Much is Enough?",
    description: "Guidelines for building a financial safety net based on your personal situation",
    category: "Savings",
    readTime: "6 min read",
    date: "2025-03-18",
    likes: 256,
    bookmarked: true
  },
  {
    id: "article-4",
    title: "Maximizing Your 401(k) Contributions",
    description: "Strategies to optimize retirement savings through employer plans",
    category: "Retirement",
    readTime: "10 min read",
    date: "2025-03-10",
    likes: 209,
    bookmarked: false
  },
];

const quickQuizzes = [
  {
    id: "quiz-1",
    title: "Retirement Planning Basics",
    questions: 5,
    timeEstimate: "3 mins",
    completed: false
  },
  {
    id: "quiz-2",
    title: "Investment Risk Tolerance",
    questions: 8,
    timeEstimate: "5 mins",
    completed: true
  },
  {
    id: "quiz-3",
    title: "Credit Score Knowledge Test",
    questions: 6,
    timeEstimate: "4 mins",
    completed: false
  }
];

export default function Education() {
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info("Search functionality coming soon");
  };

  const handleStartCourse = (courseId: string) => {
    toast.success(`Course started! Redirecting to course player...`);
  };

  const handleReadArticle = (articleId: string) => {
    toast.success(`Opening article...`);
  };

  const handleBookmark = (articleId: string) => {
    toast.success(`Article saved to your bookmarks`);
  };

  const handleLike = (articleId: string) => {
    toast.success(`Article liked`);
  };

  const handleStartQuiz = (quizId: string) => {
    toast.success(`Starting quiz...`);
  };

  const getCategoryColor = (category: string) => {
    switch(category.toLowerCase()) {
      case 'budgeting':
        return 'bg-blue-100 text-blue-800';
      case 'investing':
        return 'bg-green-100 text-green-800';
      case 'savings':
        return 'bg-amber-100 text-amber-800';
      case 'retirement':
        return 'bg-purple-100 text-purple-800';
      case 'credit':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Financial Education Center</h1>
          <p className="text-muted-foreground">Expand your financial knowledge with courses, articles, and tools</p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-finance-blue to-finance-blue-dark opacity-90 rounded-lg"></div>
          <div className="relative p-6 md:p-8 text-white">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <Badge className="bg-white text-finance-blue-dark hover:bg-gray-100">
                Learning Resources
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold">Improve Your Financial Literacy</h2>
              <p className="text-white/80">
                Browse our extensive library of courses, articles, and interactive tools designed to help you make better financial decisions.
              </p>
              <form onSubmit={handleSearchSubmit} className="flex gap-2 mt-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    placeholder="Search for topics, courses or articles..." 
                    className="pl-10 bg-white text-black border-0"
                  />
                </div>
                <Button type="submit">Search</Button>
              </form>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-finance-blue" />
              <span>Recommended Courses</span>
            </h2>
            <Button variant="link" className="text-finance-blue flex items-center gap-1">
              <span>View all courses</span>
              <ArrowRight size={16} />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map(course => (
              <Card key={course.id} className="overflow-hidden">
                <div className="h-40 overflow-hidden relative">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button className="flex items-center gap-2">
                      <Play size={16} className="fill-white" />
                      <span>Play Preview</span>
                    </Button>
                  </div>
                  <Badge className="absolute top-2 right-2">{course.level}</Badge>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pb-2">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{course.duration}</span>
                    </div>
                    <div>
                      <span>{course.modules} modules</span>
                    </div>
                  </div>
                  {course.progress > 0 && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Your progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleStartCourse(course.id)}
                    className="w-full"
                  >
                    {course.progress > 0 ? 'Continue Course' : 'Start Course'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <Tabs defaultValue="articles" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="articles" className="flex items-center gap-1">
              <BookOpen size={16} />
              <span>Articles & Guides</span>
            </TabsTrigger>
            <TabsTrigger value="quizzes" className="flex items-center gap-1">
              <Award size={16} />
              <span>Knowledge Quizzes</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="articles" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {articles.map(article => (
                <Card key={article.id} className="flex flex-col">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge className={getCategoryColor(article.category)}>
                        {article.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock size={14} />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <CardTitle className="mt-2">{article.title}</CardTitle>
                    <CardDescription>{article.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2 flex-grow">
                    <p className="text-sm text-muted-foreground">
                      Published on {new Date(article.date).toLocaleDateString('en-US', { 
                        year: 'numeric', month: 'long', day: 'numeric' 
                      })}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => handleReadArticle(article.id)}
                      className="flex items-center gap-1"
                    >
                      <BookOpen size={16} />
                      <span>Read Article</span>
                    </Button>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleLike(article.id)}
                        className={article.likes > 200 ? "text-finance-blue" : ""}
                      >
                        <ThumbsUp size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleBookmark(article.id)}
                        className={article.bookmarked ? "text-finance-yellow" : ""}
                      >
                        <Bookmark size={16} />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="flex justify-center">
              <Button variant="outline" className="flex items-center gap-1">
                <span>Load more articles</span>
                <ArrowRight size={16} />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="quizzes" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickQuizzes.map(quiz => (
                <Card key={quiz.id} className={quiz.completed ? "border-green-200 bg-green-50" : ""}>
                  <CardHeader className="pb-2">
                    {quiz.completed && (
                      <div className="flex justify-end">
                        <Badge variant="outline" className="border-green-500 text-green-600 flex items-center gap-1">
                          <CheckCircle size={14} />
                          <span>Completed</span>
                        </Badge>
                      </div>
                    )}
                    <CardTitle className="flex items-center gap-2">
                      {quiz.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Lightbulb className="h-5 w-5 text-finance-yellow" />
                      )}
                      <span>{quiz.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex justify-between text-sm mb-4">
                      <div className="flex items-center gap-1">
                        <span>{quiz.questions} questions</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{quiz.timeEstimate}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {quiz.completed 
                        ? "You've completed this quiz. Retake it to improve your score."
                        : "Test your knowledge and identify areas for improvement."}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => handleStartQuiz(quiz.id)} 
                      className="w-full"
                      variant={quiz.completed ? "outline" : "default"}
                    >
                      {quiz.completed ? 'Retake Quiz' : 'Start Quiz'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <Card className="border-dashed">
              <CardHeader className="text-center pb-2">
                <CardTitle>
                  <span className="text-finance-blue">Financial Health Quiz</span>
                </CardTitle>
                <CardDescription>
                  Take this comprehensive assessment to evaluate your overall financial health and receive personalized recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center pb-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>15 questions • 10 minutes</span>
                </Badge>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button>Take Assessment</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
