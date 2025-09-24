import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Topbar } from "@/components/topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FormField,
  FormDescription,
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Briefcase, Loader2 } from "lucide-react";
import Layout from "../../components/layout";
import { validateInternshipForm } from "@/lib/validations";
import { useNavigate } from "react-router";
import { CreatableSelect } from "@/components/creatable-select";
import { handleCreate } from "@/lib/commonFunctions";
import { useAuth, useClient } from "@/lib/dataContext";


export default function CreateInternships() {
  const [view, setView] = useState("create");
  const [isLoading, setIsLoading] = useState(false);
  const { client } = useClient();
  const [positions, setPositions] = useState([
    { value: 'software-engineer', label: 'Software Engineer' },
    { value: 'data-analyst', label: 'Data Analyst' },
    { value: 'product-manager', label: 'Product Manager' },
    { value: 'ui-ux-designer', label: 'UI/UX Designer' }
  ]);
  const [companies, setCompanies] = useState([
    { value: 'tech-corp', label: 'Tech Corp' },
    { value: 'startup-inc', label: 'Startup Inc' },
    { value: 'big-company', label: 'Big Company' }
  ]);
  const navigate = useNavigate();
  const { currentUser, token } = useAuth();


  const internshipForm = useForm({
    resolver: yupResolver(validateInternshipForm),
    defaultValues: {
      company: "",
      position: "",
      salary: "",
      requirements: "",
      responsibility: "",
      details: "",
      applicationDeadline: "",
      tags: "",
    },
  });

  const { setValue } = internshipForm;

  async function fetchCompanies() {
    try {
      const res = await client.companies.fetchAll();
      return res;
    } catch (error) {
      console.error(error, 'cannot fetch companies');
      return [];
    }
  }

  useEffect(() => {
    if (token && client) {
      fetchCompanies().then(res => {
        console.log('Companies response:', res.data);
        if (res.status === 200) {
          const companyOptions = res.data.map(company => ({
            value: company._id,
            label: company.name
          }));
          console.log('Company options:', companyOptions);
          setCompanies(companyOptions);
        }
      });
    }
  }, [token, client]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    console.log("Form Data:", data);
  };

  return (
    <>
      {currentUser ? (
        <Layout user={currentUser}>
          <Topbar
            view={view}
            setView={setView}
            title="Create New Internship"
            mode="form"
          />
          <div className="w-[80%] m-auto py-4">
            <Form {...internshipForm}>
              <div className="flex flex-col items-center mb-6">
                <Briefcase className="w-12 h-12 text-blue-600 mb-2" />
                <h2 className="text-2xl font-semibold text-gray-800">
                  Create New Internship
                </h2>
                <p className="text-gray-600 text-sm">
                  Fill out the details below to create a new internship
                  opportunity
                </p>
              </div>
              <form
                onSubmit={internshipForm.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={internshipForm.control}
                    name="company"
                    render={({ field ,fieldState}) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <CreatableSelect
                            options={companies}
                            form={internshipForm}
                            error={fieldState.error}
                            controller={field}
                            onCreateOption={(inputValue) => handleCreate(client, setCompanies, setValue, inputValue, 'company')}
                              placeholder="Enter or Select company ..."
                              searchPlaceholder="Search companies..."
                              createLabel="Create new company"
                              className="w-full"
                                                    />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={internshipForm.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position </FormLabel>
                        <FormControl>
                          <Input placeholder="Position" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={internshipForm.control}
                    name="salary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Salary</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Salary of the position"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={internshipForm.control}
                    name="requirements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Requirements</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Requirements for the role"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={internshipForm.control}
                    name="responsibility"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Responsibility</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Responsibilities of the role"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={internshipForm.control}
                    name="details"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Details</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Details about the internship"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={internshipForm.control}
                    name="applicationDeadline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Application Deadline</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            placeholder="Application Deadline"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={internshipForm.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Tags (comma separated)"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Separate tags with commas (e.g., "React, JavaScript,
                          Frontend")
                        </FormDescription>
                        {field.value && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {field.value.split(",").map((tag, index) => {
                              const trimmedTag = tag.trim();
                              return trimmedTag ? (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                >
                                  {trimmedTag}
                                </span>
                              ) : null;
                            })}
                          </div>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full mt-4" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Internship"}
                </Button>
              </form>
            </Form>
          </div>
        </Layout>
      ) : (
        <div></div>
      )}
    </>
  );
}
  