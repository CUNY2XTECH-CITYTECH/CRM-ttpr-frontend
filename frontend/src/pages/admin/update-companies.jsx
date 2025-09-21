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
import '@/styles/animation.css'
import { CreatableSelect } from "@/components/creatable-select";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { validateCompaniesForm } from "@/lib/validations";
import { Combobox } from "@/components/combobox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router";
import { useAuth, useClient } from "@/lib/dataContext";
import toast from "react-hot-toast";
import { handleCreate } from "@/lib/commonFunctions";
const UpdateCompanies = () => {
  const [positions, setPositions] = useState([])
  const [departments, setDepartments] = useState([])
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
      contactName: "",
      contactEmail: "",
      contactPosition: "",
      contactDepartment: "",
      contactPhone: "",
      mission: "",
      industry: "",
      website: "",
      city: "",
      state: "",
      street: "",
      zipcode: "",
    },
  });

  const { setValue } = companiesForm
  const fetchCurrentCompany = async (ind,states) => {
    try {
      const currentCompany = await client.companies.fetchOne(id)
      if (currentCompany.status === 200) {
        let { location, industry, ...rest } = currentCompany.data
        const locationArr = location.split(",")
        const industry_name = ind.find(indu => indu._id === industry || indu.name === industry)?._id
        console.log({industry_name,industry,ind})
        const companyData = {
          ...rest,
          industry: industry_name,
          city: locationArr[1] ? locationArr[1].trim() : '',
          street: locationArr[0] ? locationArr[0].trim() : '',
          state: states.find(s => s.abbreviation=== (locationArr[2] ? locationArr[2].trim() : ''))?.name || (locationArr[2] ? locationArr[2].trim() : ''),
          zipcode: locationArr[3] ? locationArr[3].trim() : ''
        }
        if (companyData) {
          await getCities(companyData.state || '')
          setCompany(companyData);
          setCurrentState(companyData.state || '')
          companiesForm.reset(companyData)
          setIsLoading(false)
          setFormkey(prev => prev + 1)
        }
      }
      let posres = await client.positions.fetchAll()
      if (posres && posres.status === 200) {
        setPositions(posres.data.positions)
      }

      let deptres = await client.departments.fetchAll()
      if (deptres && deptres.status === 200) {
        setDepartments(deptres.data.departments)
      }


    }
    catch (err) {
      console.log(err)
      toast.error("error occurred")
    }
  }
  const getCities = async (state) => {
    let res = await client.stateCities.fetchCitiesByState(state)
    if (res.status === 200) {
      setCities(res.data.data)
    }
  }

  const loadData = async () => {
    let res = await client.industries.fetchAll()
    if (res.status === 200) {
      setIndustries(res.data.industries)
    }
    let cityres = await client.stateCities.fetchCities()
    if (cityres.status === 200) {
      setCities(cityres.data)
    }
    let stateres = await client.stateCities.fetchStates()
    if (stateres.status === 200) {
      setStates(stateres.data.states)
    }
    await fetchCurrentCompany(res.data.industries,stateres.data.states)
  }


  useEffect(() => {
    loadData()
  }, []);

  const onSubmit = async (values) => {
    try {
      console.log(values,'values')
      let tryUpdate = await client.companies.update(values,{credentials:'include'})
      if (tryUpdate.status === 200) {
        toast.success("Company updated successfully")
      }
    }
    catch (err) {
      console.log(err)
      toast.error("error occurred")
    }
  };
  if (isLoading) return <div className="h-screen grid justify-items-center items-center"><div className="loader"></div></div>
  return (
    <>
      <Layout user={currentUser}>
        <Topbar title={company.name} mode="create" />
        <div className="w-[80%] m-auto py-4">
          <Form {...companiesForm} key={formkey}>
            <form
              onSubmit={companiesForm.handleSubmit(onSubmit)}
              className="grid space-y-2"
            >
              <Button type="submit" className={"ml-auto"}>
                Save
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={companiesForm.control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <FormItem className={"relative"}>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Company Name" {...field} />
                      </FormControl>
                      {fieldState.error ?
                        <FormMessage
                          className={" text-xs -mt-1 "}
                        /> : <div className="h-4 w-full">
                        </div>}
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={companiesForm.control}
                  name="email"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Company Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Company Email" {...field} />
                      </FormControl>
                      {fieldState.error ?
                        <FormMessage
                          className={" text-xs -mt-1 "}
                        /> : <div className="h-4 w-full">
                        </div>}

                    </FormItem>
                  )}
                ></FormField>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={companiesForm.control}
                  name="contactName"
                  render={({ field, fieldState }) => (
                    <FormItem className={"relative"}>
                      <FormLabel>Contact Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Contact Name" {...field} />
                      </FormControl>
                      {fieldState.error ?
                        <FormMessage
                          className={" text-xs -mt-1 "}
                        /> : <div className="h-4 w-full">
                        </div>}

                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={companiesForm.control}
                  name="contactEmail"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Contact Person Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Contact Person Email" {...field} />
                      </FormControl>
                      {
                        fieldState.error ?
                          <FormMessage
                            className={" text-xs -mt-1 "}
                          />
                          : <div className="h-4 w-full">
                          </div>
                      }
                    </FormItem>
                  )}
                ></FormField>
              </div>
              <div className="grid grid-cols-2 gap-2">

                <FormField
                  control={companiesForm.control}
                  name="contactPosition"
                  render={({ field, fieldState }) => (
                    <FormItem className={"relative"}>
                      <FormLabel>Contact Person Position</FormLabel>
                      <FormControl>
                        <CreatableSelect
                          form={companiesForm}
                          error={fieldState.error}
                          options={positions}
                          controller={field}
                          onCreateOption={(inputValue) => handleCreate(client,setPositions, setValue, inputValue, 'contactPosition')}
                          placeholder="Enter or Select position ..."
                          searchPlaceholder="Search positions..."
                          createLabel="Create new position"
                          className="w-full"
                        />
                      </FormControl>
                      {
                        fieldState.error ?
                          <FormMessage
                            className={" text-xs -mt-1 "}
                          />
                          : <div className="h-4 w-full">
                          </div>
                      }
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={companiesForm.control}
                  name="contactDepartment"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Contact Person Department</FormLabel>
                      <FormControl>
                        <CreatableSelect
                          options={departments}
                          form={companiesForm}
                          error={fieldState.error}
                          controller={field}
                          onCreateOption={(inputValue) => handleCreate(client,setDepartments, setValue, inputValue, 'contactDepartment')}
                          placeholder="Enter or Select department..."
                          searchPlaceholder="Search departments..."
                          createLabel="Create new department"
                          className="w-full"
                        />

                      </FormControl>
                      {
                        fieldState.error ?
                          <FormMessage
                            className={" text-xs -mt-1 "}
                          />
                          : <div className="h-4 w-full">
                          </div>
                      }
                    </FormItem>
                  )}
                ></FormField>
              </div>
              <div>
                <FormField
                  control={companiesForm.control}
                  name="contactPhone"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Contact Person Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Contact Person Phone Number" {...field} />
                      </FormControl>
                      {
                        fieldState.error ?
                          <FormMessage
                            className={" text-xs -mt-1 "}
                          />
                          : <div className="h-4 w-full">
                          </div>
                      }
                    </FormItem>
                  )}
                ></FormField>
              </div>

              <div>
                <FormField
                  control={companiesForm.control}
                  name="mission"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Company Mission</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Company Mission" {...field} />
                      </FormControl>
                      {fieldState.error ?
                        <FormMessage
                          className={" text-xs -mt-1 "}
                        /> : <div className="h-4 w-full">
                        </div>}

                    </FormItem>
                  )}
                ></FormField>
              </div>
              <div>
                <FormField
                  control={companiesForm.control}
                  name="industry"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Choose Industry</FormLabel>
                        <CreatableSelect
                          form={companiesForm}
                          options={industries}
                          error={fieldState.error}
                          controller={field}
                          onCreateOption={(inputValue) => handleCreate(client,setIndustries, setValue, inputValue, 'industry')}
                          placeholder="Select industry..."
                          searchPlaceholder="Search industry..."
                          createLabel="Create new industry"
                          className="w-full"
                        />


                      {fieldState.error ?
                        <FormMessage
                          className={" text-xs -mt-1 "}
                        /> : <div className="h-4 w-full">
                        </div>}

                    </FormItem>
                  )}
                ></FormField>
              </div>
              <div>
                <FormField
                  control={companiesForm.control}
                  name="website"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Company Website URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://www.example.com"
                          {...field}
                        />
                      </FormControl>
                      {fieldState.error ?
                        <FormMessage
                          className={" text-xs -mt-1 "}
                        /> : <div className="h-4 w-full">
                        </div>}



                    </FormItem>
                  )}
                ></FormField>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={companiesForm.control}
                  name="state"
                  render={({ field, fieldState }) => (
                    <FormItem>

                      <FormLabel>Choose State</FormLabel>
                      <Combobox dataList={states} controller={field} type="state" getCities={getCities} />
                      {fieldState.error ?
                        <FormMessage
                          className={" text-xs -mt-1 "}
                        /> : <div className="h-4 w-full">
                        </div>}


                    </FormItem>
                  )}
                ></FormField>

                <FormField
                  control={companiesForm.control}
                  name="city"
                  render={({ field, fieldState }) => (
                    <FormItem>

                      <FormLabel>Choose City</FormLabel>
                      <Combobox dataList={cities} controller={field} type="city" />
                      {fieldState.error ?
                        <FormMessage
                          className={" text-xs -mt-1 "}
                        /> : <div className="h-4 w-full">
                        </div>}


                    </FormItem>
                  )}
                ></FormField>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={companiesForm.control}
                  name="street"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Street</FormLabel>
                      <FormControl>
                        <Input placeholder="xxx street" {...field} />
                      </FormControl>
                      {fieldState.error ?
                        <FormMessage
                          className={" text-xs -mt-1 "}
                        /> : <div className="h-4 w-full">
                        </div>}


                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={companiesForm.control}
                  name="zipcode"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Zipcode</FormLabel>
                      <FormControl>
                        <Input placeholder="xxxxxx-xxxx" {...field} />
                      </FormControl>
                      {fieldState.error ?
                        <FormMessage
                          className={" text-xs -mt-1 "}
                        /> : <div className="h-4 w-full">
                        </div>}

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
