import Layout from "@/components/layout";
import { Topbar } from "@/components/topbar";
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
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { validateCompaniesForm } from "@/lib/validations";
import { Combobox } from "@/components/combobox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router";
import { useAuth, useClient } from "@/lib/dataContext";
import toast from "react-hot-toast";

const UpdateCompanies = () => {
  const { id } = useParams()
  const { currentUser } = useAuth();
  const { client } = useClient()
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true)
  const [company, setCompany] = useState(null)
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [currentState, setCurrentState] = useState("")
  const [formkey, setFormkey] = useState(0)
  const [industries, setIndustries] = useState([])
  // const [view, setView] = useState row')
  const companiesForm = useForm({
    resolver: yupResolver(validateCompaniesForm),
    defaultValues: {
      name: "",
      email: "",
      mission: "",
      industry: "",
      website: "",
      city: "",
      street: "",
      zipcode: "",
    },
  });
  const fetchCurrentCompany = async () => {
    try {
      const currentCompany = await client.companies.fetchOne(id)
      if (currentCompany.status === 200) {
        const location = currentCompany.data.location.split(",")
        const industry_name = await client.industries.fetchOne(currentCompany.data.industry);
        const companyData = {
          ...currentCompany.data,
          industry: industry_name.data?.industries.name,
          city: location[1],
          street: location[0],
          state: location[2],
          zipcode: location[3]
        }
        setCompany(companyData);
        setCurrentState(location[2])
        await getCities(location[2])
        companiesForm.reset(companyData)
        setIsLoading(false)
        setFormkey(prev => prev + 1)
      }
    }
    catch (err) {
      console.log(err)
      toast.error("error occurred")
    }
  }
  const getCities = async (state) => {
    console.log('state', state)
    let res = await client.stateCities.fetchCitiesByState(state)
    if (res.status === 200) {
      console.log(res.data.data, 'city')
      setCities(res.data.data)
    }
  }

  const loadData = async () => {
    let res = await client.industries.fetchAll()
    if (res.status === 200) {
      console.log(res.data, 'ind')
      setIndustries(res.data.industries)
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


  useEffect(() => {
    fetchCurrentCompany()
    loadData()
  }, []);

  const onSubmit = (values) => {
    console.log("v", values);
  };
  if (isLoading) return <div>Loading...</div>
  return (
    <>
      <Layout user={currentUser}>
        <Topbar title={company.name} mode="create" />
        <div className="w-[80%] m-auto py-4">
          <Form {...companiesForm} key={formkey}>
            <form
              onSubmit={companiesForm.handleSubmit(onSubmit)}
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
                    console.log(field, 'mission'),
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
                      <Combobox dataList={industries} controller={field} type="industry" />
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
                      <Combobox dataList={states} controller={field} type="state" getCities={getCities} />
                      <FormMessage
                        className={"text-xs absolute -bottom-5 left-0"}
                      />
                    </FormItem>
                  )}
                ></FormField>

                <FormField
                  control={companiesForm.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>

                      <FormLabel>Choose City</FormLabel>
                      <Combobox dataList={cities} controller={field} type="city"  />

                      <FormMessage
                        className={"text-xs absolute -bottom-5 left-0"}
                      />
                    </FormItem>
                  )}
                ></FormField>
              </div>

              <div className="grid grid-cols-3 gap-2">
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
    </>
  );
};
export default UpdateCompanies;
