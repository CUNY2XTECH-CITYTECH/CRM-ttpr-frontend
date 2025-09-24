import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Layout from "@/components/layout";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Legend } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useAuth } from "@/lib/dataContext";

// Sample data for different categories
const techstackData = {
  frontend: [
    { name: "React", usage: 85, projects: 42 },
    { name: "Vue.js", usage: 65, projects: 28 },
    { name: "Angular", usage: 45, projects: 18 },
    { name: "Svelte", usage: 25, projects: 8 },
    { name: "Next.js", usage: 70, projects: 35 },
  ],
  backend: [
    { name: "Node.js", usage: 80, projects: 38 },
    { name: "Python", usage: 75, projects: 32 },
    { name: "Java", usage: 60, projects: 24 },
    { name: "Go", usage: 40, projects: 15 },
    { name: "PHP", usage: 35, projects: 12 },
  ],
  database: [
    { name: "PostgreSQL", usage: 70, projects: 30 },
    { name: "MongoDB", usage: 55, projects: 22 },
    { name: "MySQL", usage: 50, projects: 20 },
    { name: "Redis", usage: 45, projects: 18 },
    { name: "SQLite", usage: 30, projects: 10 },
  ],
  devops: [
    { name: "Docker", usage: 85, projects: 40 },
    { name: "Kubernetes", usage: 60, projects: 25 },
    { name: "AWS", usage: 75, projects: 35 },
    { name: "Vercel", usage: 50, projects: 20 },
    { name: "GitHub Actions", usage: 65, projects: 28 },
  ],
};

const categories = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "database", label: "Database" },
  { value: "devops", label: "DevOps" },
];

export default function TechStacks() {

  const { token, currentUser } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("frontend");
  const currentData = techstackData[selectedCategory];

  // Calculate quick stats
  const totalProjects = currentData.reduce((sum, tech) => sum + tech.projects, 0);
  const avgUsage = Math.round(
    currentData.reduce((sum, tech) => sum + tech.usage, 0) / currentData.length
  );
  const mostUsed = currentData.reduce((prev, current) =>
    prev.usage > current.usage ? prev : current
  );
  const leastUsed = currentData.reduce((prev, current) =>
    prev.usage < current.usage ? prev : current
  );

  return (
    <Layout user={currentUser}>
      <main className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              Techstack Usage Analytics
            </h1>
            <p className="text-muted-foreground">
              View technology adoption across different categories
            </p>
          </div>

          {/* Category Selector */}
          <div className="flex justify-center">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[30%_auto] gap-6">
          <div className="p-4 border-gray-200 border rounded-lg h-fit max-h-200">
            <h3 className="text-sm font-medium text-sidebar-accent-foreground mb-2">Quick Stats</h3>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Most Used:</span>
                <span className="text-chart-1">React (89%)</span>
              </div>
              <div className="flex justify-between">
                <span>Fastest Growing:</span>
                <span className="text-chart-2">Next.js (+45%)</span>
              </div>
              <div className="flex justify-between">
                <span>Least Used:</span>
                <span className="text-chart-5">jQuery (2%)</span>
              </div>
            </div>
          </div>
          {/* Stacked Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>
                {categories.find((c) => c.value === selectedCategory)?.label}{" "}
                Technologies
              </CardTitle>
              <CardDescription>
                Usage percentage and project count by technology
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  usage: {
                    label: "Usage %",
                    color: "hsl(var(--chart-1))",
                  },
                  projects: {
                    label: "Projects",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={currentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="usage" fill="var(--color-usage)" name="Usage %" />
                    <Bar dataKey="projects" fill="var(--color-projects)" name="Projects" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
          </div>
        </div>
      </main>
    </Layout>
  );
}
