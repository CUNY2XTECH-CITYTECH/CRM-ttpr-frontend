import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GraduationCap, Users, Briefcase } from "lucide-react"
import Layout from "../../components/layout"


export default function InternshipForm() {
const [company, setCompany] = useState("")
const [position, setPosition] = useState("")
const [salary, setSalary] = useState("")
const [requirements, setRequirements] = useState("")
const [responsibility, setResponsibility] = useState("")
const [details, setDetails] = useState("")
const [applicationDeadline, setApplicationDeadline] = useState("")
const [tags, setTags] = useState("")

    return (
   <Layout>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-white border-0">
            <CardHeader className="text-center">
                <div className="mx-auto mb-4 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold">Create Internship Form</CardTitle>
                <CardDescription>Please fill out the form to create internship for students</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="company">Company Name</Label>
                        <Input
                            id="company"
                            type="text"
                            placeholder="Enter company name"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="position">Position Title</Label>
                        <Input
                            id="position"
                            type="text"
                            placeholder="Enter position"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="salary">Salary</Label>
                        <Input
                            id="salary"
                            type="text"
                            placeholder="Enter salary (ex: 50000)"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="requirements">Requirements</Label>
                        <Input
                            id="requirements"
                            type="text"
                            placeholder="Enter requirements"
                            value={requirements}
                            onChange={(e) => setRequirements(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="responsibility">Responsibility</Label>
                        <Input
                            id="responsibility"
                            type="text"
                            placeholder="Enter responsibility"
                            value={responsibility}
                            onChange={(e) => setResponsibility(e.target.value)}
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="details">Details</Label>
                        <textarea
                            id="details"
                            placeholder="Enter details about the internship"
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            className="w-full min-h-[150px] p-4 border rounded-md placeholder:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            rows={6}
                            required
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="applicationDeadline">Application Deadline</Label>
                        <Input
                            id="applicationDeadline"
                            type="date"
                            value={applicationDeadline}
                            onChange={(e) => setApplicationDeadline(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="tags">Tags</Label>
                        <Input
                            id="tags"
                            type="text"
                            placeholder="Enter tags (comma separated)"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                        />
                        {tags && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {tags.split(',').map((tag, index) => (
                                    tag.trim() && (
                                        <span
                                            key={index}
                                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border"
                                        >
                                            {tag.trim()}
                                        </span>
                                    )
                                ))}
                            </div>
                        )}
                    </div>

                    <Button type="submit" className="w-full mt-6">
                        Create Internship Posting
                    </Button>
                </form>
            </CardContent>
        </Card>
    </div>
   </Layout>
    )
}