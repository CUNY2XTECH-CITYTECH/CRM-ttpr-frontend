import Layout from "@/components/layout";
import { Topbar } from "@/components/topbar";
import {toast} from 'react-hot-toast'
import {
  FormField,
  FormDescription,
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
  Form,
} from "@/components/ui/form";
import React, { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { validateCompaniesForm } from "@/lib/validations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAuth, useClient } from "@/lib/dataContext";
import { useNavigate } from "react-router";
import { SuggestionInput } from "@/components/suggestion-input";
const CreateCompanies = () => {
  const { token, currentUser } = useAuth();

  const [industries, setIndustries] = useState([])
  const [states, setStates] = useState([])

  const [cities, setCities] = useState([])
  const { client } = useClient()
  const navigate = useNavigate();
  // const [view, setView] = useState('row')
  const companiesForm = useForm({
    resolver: yupResolver(validateCompaniesForm),
    defaultValues: {
      name: "",
      email: "",
      mission: "",
      industry: "",
      website: "",
      city: "",
      state: "",
      street: "",
      zipcode: "",
    },
  });
  const selectedState = useWatch({
    control: companiesForm.control,
    name: "state", // Field name to watch
  });
  console.log('watching'.selectedState)
  const handleSelect = (suggestion) => {
    console.log("Selected:", suggestion)
    // Handle the selected suggestion
  }
  useEffect(() => {
    const loadData = async () => {
      let res = await client.industry.fetchAll()
      if (res.status === 200) {
        setIndustries(res.data.data.industries)
      }
      let cityres = await client.stateCities.fetchCities()
      if (cityres.status === 200) {
        console.log(cityres.data, 'city')
        setCities(cityres.data)
      }
      let stateres = await client.stateCities.fetchStates()
      console.log(stateres, 'wow')
      if (stateres.status === 200) {
        console.log(stateres.data, stateres.data.states[0].abbreviation, 'state')
        setStates(stateres.data.states)
      }
    }

    if (currentUser && currentUser?.role !== "admin") {
      navigate("/not-authorized");
    }
    if (!token) {
      navigate('/login')
    }
    loadData()
  }, [token]);

  const onSubmit = async (values) => {
    console.log("v", values);
    let res = await client.companies.create(values,{credentials:'include'})
    // if registeration successed
    if (res.status == 200) {
      toast.success("successfully created company")
    }
    else {
      toast.error("Error creating company")
    }
  }
  const onError = (err) => {
    console.log(err, 'err')
  }
  return (
    <>
      {currentUser ? (
        <Layout user={currentUser}>
          <Topbar title="Add New Company" mode="create" />
          <div className="w-[80%] m-auto py-4">
            <Form {...companiesForm}>
              <form
                onSubmit={companiesForm.handleSubmit(onSubmit, onError)}
                className="grid space-y-8"
              >
                <Button type="submit" className={"ml-auto"}>
                  Save
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={companiesForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className={"relative"}>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Company Name" {...field} />
                        </FormControl>
                        <FormMessage
                          className={"text-xs absolute -bottom-5 left-0"}
                        />
                      </FormItem>
                    )}
                  ></FormField>
                  <FormField
                    control={companiesForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Company Email" {...field} />
                        </FormControl>
                        <FormMessage
                          className={"text-xs absolute -bottom-5 left-0"}
                        />
                      </FormItem>
                    )}
                  ></FormField>
                </div>
                <div>
                  <FormField
                    control={companiesForm.control}
                    name="mission"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Mission</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Company Mission" {...field} />
                        </FormControl>
                        <FormMessage
                          className={"text-xs absolute -bottom-5 left-0"}
                        />
                      </FormItem>
                    )}
                  ></FormField>
                </div>
                <div>
                  <FormField
                    control={companiesForm.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Choose Industry</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Choose Industry" {...field} />
                            </SelectTrigger>
                            <SelectContent>
                              {industries?.length > 0 &&
                                industries.map((industry) =>
                                  <SelectItem value={industry._id}>{industry.industryName}</SelectItem>
                                )
                              }
                            </SelectContent>
                          </Select>
                        </FormControl>

                        <FormMessage
                          className={"text-xs absolute -bottom-5 left-0"}
                        />
                      </FormItem>
                    )}
                  ></FormField>
                </div>
                <div>
                  <FormField
                    control={companiesForm.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Website URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://www.example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage
                          className={"text-xs absolute -bottom-5 left-0"}
                        />
                      </FormItem>
                    )}
                  ></FormField>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={companiesForm.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Choose State</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Choose State" {...field} />
                            </SelectTrigger>
                            <SelectContent>
                              {states?.length > 0 &&
                                states.map((state, key) =>

                                  <SelectItem key={key} value={state.name}>{state.abbreviation}</SelectItem>
                                )}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage
                          className={"text-xs absolute -bottom-5 left-0"}
                        />
                      </FormItem>
                    )}
                  ></FormField>

                  {/*SuggestionInput
                  //   placeholder="Search for topics..."
                  //   onSelect={handleSelect}
                  //   className="mb-4"
                  //   state={selectedState}
                  // />*/}
                  <FormField
                    control={companiesForm.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Choose City</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Theme" {...field} />
                            </SelectTrigger>
                            <SelectContent>
                              {cities?.length > 0 &&
                                cities.map((state, key) =>

                                  <SelectItem value={state} key={key}>{state}</SelectItem>
                                )}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage
                          className={"text-xs absolute -bottom-5 left-0"}
                        />
                      </FormItem>
                    )}
                  ></FormField>
                </div>
                <div className="grid grid-cols-2 gap-2">

                  <FormField
                    control={companiesForm.control}
                    name="street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street</FormLabel>
                        <FormControl>
                          <Input placeholder="xxx street" {...field} />
                        </FormControl>
                        <FormMessage
                          className={"text-xs absolute -bottom-5 left-0"}
                        />
                      </FormItem>
                    )}
                  ></FormField>
                  <FormField
                    control={companiesForm.control}
                    name="zipcode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zipcode</FormLabel>
                        <FormControl>
                          <Input placeholder="xxxxxx-xxxx" {...field} />
                        </FormControl>
                        <FormMessage
                          className={"text-xs absolute -bottom-5 left-0"}
                        />
                      </FormItem>
                    )}
                  ></FormField>
                  <FormDescription>
                    This is Company&apos;s Location
                  </FormDescription>
                </div>
              </form>
            </Form>
          </div>
        </Layout>
      ) : (
        <div></div>
      )}
    </>
  );
};
export default CreateCompanies;
