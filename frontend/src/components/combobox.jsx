import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"



export function Combobox({ error,dataList, type, controller,form=null, getCities = null }) {
  const [open, setOpen] = React.useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between", error && "border-destructive text-destructive")}
        >
          {
            ((val = dataList?.find(d => (typeof d === 'string' ? d === controller.value : d?._id=== controller.value || d?.name===controller.value))) =>
              typeof val === 'string' ? val : val?.name || `Select ${type}`)()
          }
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search ..." className="h-9" />
          <CommandList>
            <CommandEmpty>No {type} found.</CommandEmpty>
            <CommandGroup>
              {dataList?.map((data, key) => (
                <CommandItem
                  key={typeof(data)==='string'?key:data?._id || data?.name }
                  value={typeof(data)=='string'?data:data?.name }
                  onSelect={(currentValue) => {
                    controller.onChange(currentValue === controller.value ? "" : currentValue)
                    setOpen(false)
                    form && form.setValue(type,data?._id,{
                      shouldValidate: true,
                      shouldDirty: true
                    } )
                    getCities && getCities(currentValue)
                  }}

                >
                  {typeof (data) === 'string' ? data : data?.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      controller.value === data.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

