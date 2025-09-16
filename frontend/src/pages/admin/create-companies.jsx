import Layout from "@/components/layout";
import { Topbar } from "@/components/topbar";
import { toast } from 'react-hot-toast'
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAuth, useClient } from "@/lib/dataContext";
import { useNavigate } from "react-router";
import { Combobox } from "@/components/combobox";
import { CreatableSelect } from "@/components/creatable-select";
import { handleCreate } from "@/lib/commonFunctions";

const CreateCompanies = () => {
  const { token, currentUser } = useAuth();
  const [departments, setDepartments] = useState([])
  const [industries, setIndustries] = useState([])
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [positions, setPositions] = useState([])
  const { client } = useClient() //

  const navigate = useNavigate();
  // const [view, setView] = useState('row')
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
  const loadData = async () => {
    let res = await client.industries.fetchAll()
    if (res && res.status === 200) {
      setIndustries(res.data.industries)
    }
    let stateres = await client.stateCities.fetchStates()
    if (stateres.status === 200) {
      setStates(stateres.data.states)
    }
    let deptres = await client.departments.fetchAll()
    if (deptres && deptres.status === 200) {
      setDepartments(deptres.data.departments)
    }
    let posres = await client.positions.fetchAll()
    if (posres && posres.status === 200) {
      setPositions(posres.data.positions)
    }

  }
  useEffect(() => {
        loadData()
  }, [token]);

   const getCities = async (state) => {
    let res = await client.stateCities.fetchCitiesByState(state)
    if (res.status === 200) {
      setCities(res.data.data)
    }
  }
  const onSubmit = async (values) => {
    let res = await client.companies.create(values, { credentials: 'include' })
    // if registeration successed
    console.log('create company response', res)
    if (res.status == 200) {
      toast.success("successfully created company")
    }
    else if (res.status == 201) {
      toast.info("Company with this email already exists")
   }
    else {
      toast.error("Error creating company")
    }
  }
  return (
    <>
      {currentUser ? (
        <Layout user={currentUser}>
          <Topbar title="Add New Company" mode="create" />
          <div className="w-[80%] m-auto py-4">
            <Form {...companiesForm}>
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
                            placeholder="Select position ..."
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
                            placeholder="Select department..."
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
                    name="state"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Choose State</FormLabel>
                        <Combobox error={fieldState.error} dataList={states} controller={field} type="state" getCities={getCities} />
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
                    name="city"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Choose City</FormLabel>
                        <Combobox error={fieldState.error} dataList={cities} controller={field} type="city" />
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
                    name="street"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Street</FormLabel>
                        <FormControl>
                          <Input placeholder="xxx street" {...field} />
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
                    name="zipcode"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Zipcode</FormLabel>
                        <FormControl>
                          <Input placeholder="xxxxxx-xxxx" {...field} />

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
