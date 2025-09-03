import * as React from "react"
import { Check, ChevronsUpDown, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"



export function CreatableSelect({
  options,
  form,
  error,
  controller,
  onCreateOption,
  placeholder = "Select option...",
  searchPlaceholder = "Search options...",
  createLabel = "Create",
  className,
  disabled = false,
}) {
  const [open, setOpen] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState("")

  const selectedOption = options.find((option) => option.name === controller?.value || option._id === controller?.value)

  const filteredOptions = options.filter((option) => option.name?.toLowerCase().includes(searchValue.toLowerCase()))

  const exactMatch = filteredOptions.find((option) => option.name?.toLowerCase() === searchValue.toLowerCase())

  const showCreateOption = searchValue && !exactMatch && onCreateOption


  const handleCreateFunction = async() => {
    if (searchValue && onCreateOption) {
      setOpen(false)
      setSearchValue("")
      const option = await onCreateOption(searchValue)
      console.log("Created option:", option)
      controller.onChange(option._id? option._id : "select an option")

    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className, error && "border-destructive text-destructive", disabled && "cursor-not-allowed bg-gray-100")}
          disabled={disabled}
        >
          {selectedOption ? selectedOption.name : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder} value={searchValue} onValueChange={setSearchValue} />
          <CommandList>
            <CommandEmpty>
              {showCreateOption ? (
                <div className="p-2">
                  <Button variant="ghost" className="w-full justify-start" onClick={handleCreateFunction}>
                    <Plus className="mr-2 h-4 w-4" />
                    {createLabel} "{searchValue}"
                  </Button>
                </div>
              ) : (
                "No options found."
              )}
            </CommandEmpty>
            {filteredOptions.length > 0 && (
              <CommandGroup>
                {filteredOptions.map((option) => (
                  <CommandItem key={option?._id || option?.name}
                    value={option.name}
                    onSelect={(val) => {
                      console.log("Selected option now:", val,controller.value, option?._id)
                      controller.onChange(val) 
                      setOpen(false)
                      form && form.setValue(controller.name, option?._id, { shouldValidate: true, shouldDirty: true })
                      setSearchValue("")
                    }
                    }>
                    <Check className={cn("mr-2 h-4 w-4", controller?.value === option._id || controller?.value === option.name? "opacity-100" : "opacity-0")} />
                    {option.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {showCreateOption && filteredOptions.length > 0 && (
              <CommandGroup>
                <CommandItem onSelect={handleCreateFunction}>
                  <Plus className="mr-2 h-4 w-4" />
                  {createLabel} "{searchValue}"
                </CommandItem>
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

