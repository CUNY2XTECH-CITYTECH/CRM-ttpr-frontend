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

const CreateCompanies = () => {
  const { token, currentUser } = useAuth();
  const [departments, setDepartments] = useState([])
  const [industries, setIndustries] = useState([])
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [positions, setPositions] = useState([])
  const { client } = useClient()

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
    console.log('deptres', deptres)
    if (deptres && deptres.status === 200) {
      setDepartments(deptres.data.departments)
    }
  }
  useEffect(() => {

    if (currentUser && currentUser?.role !== "admin") {
      navigate("/not-authorized");
    }
    if (!token) {
      navigate('/login')
    }
    loadData()
  }, [token]);

  const handleCreate = (setFunc, setVal, inputValue, type) => {
    const newOption = { name: inputValue };
    setFunc((prev) => [...prev, newOption]);
    console.log('inputValue', inputValue)
    setVal(type, inputValue, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const getCities = async (state) => {
    console.log('state', state)
    let res = await client.stateCities.fetchCitiesByState(state)
    if (res.status === 200) {
      console.log(res.data.data, 'city')
      setCities(res.data.data)
    }
  }
  const onSubmit = async (values) => {
    let res = await client.companies.create(values, { credentials: 'include' })
    // if registeration successed
    console.log('sre', res)
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
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={companiesForm.control}
                    name="contactName"
                    render={({ field }) => (
                      <FormItem className={"relative"}>
                        <FormLabel>Contact Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Contact Name" {...field} />
                        </FormControl>
                        <FormMessage
                          className={"text-xs absolute -bottom-5 left-0"}
                        />
                      </FormItem>
                    )}
                  ></FormField>
                  <FormField
                    control={companiesForm.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Person Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Contact Person Email" {...field} />
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
                    name="contactPosition"
                    render={({ field }) => (
                      <FormItem className={"relative"}>
                        <FormLabel>Contact Person Position</FormLabel>
                        <FormControl>
                          <CreatableSelect
                            options={positions}
                            value={field.value}
                            onValueChange={field.onChange}
                            onCreateOption={(inputValue) => handleCreate(setPositions, setValue, inputValue, 'contactPosition')}
                            placeholder="Enter or Select position ..."
                            searchPlaceholder="Search positions..."
                            createLabel="Create new position"
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage
                          className={"text-xs absolute -bottom-5 left-0"}
                        />
                      </FormItem>
                    )}
                  ></FormField>
                  <FormField
                    control={companiesForm.control}
                    name="contactDepartment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Person Department</FormLabel>
                        <FormControl>
                          <CreatableSelect
                            options={departments}
                            form={companiesForm}
                            controller={field}
                            onCreateOption={(inputValue) => handleCreate(setDepartments, setValue, inputValue, 'contactDepartment')}
                            placeholder="Enter or Select department..."
                            searchPlaceholder="Search departments..."
                            createLabel="Create new department"
                            className="w-full"
                          />

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
                    name="contactPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Person Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Contact Person Phone Number" {...field} />
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
                        <Combobox form={companiesForm} dataList={industries} controller={field} type="industry" />
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
                      </FormItem>
                    )}
                  ></FormField>

                  <FormField
                    control={companiesForm.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Choose City</FormLabel>
                        <Combobox dataList={cities} controller={field} type="city" />
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
