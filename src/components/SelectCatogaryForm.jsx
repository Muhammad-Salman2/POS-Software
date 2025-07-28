import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectScrollable() {
  return (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a catogary" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select Catogary</SelectLabel>
          <SelectItem value="acceceries">Acceceries</SelectItem>
          <SelectItem value="furneture">Furneture</SelectItem>
          <SelectItem value="faishan">Faishan</SelectItem>
          <SelectItem value="home decore">Home decore</SelectItem>
          <SelectItem value="electronics">Electronics</SelectItem>
          <SelectItem value="pahrma">pahrma</SelectItem>
        </SelectGroup>
        
      </SelectContent>
    </Select>
  )
}
