"use client"
import React from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface MultipleChoiceProps {
  question: string
  answerOptions: string[]
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({
  question,
  answerOptions,
}) => {
  const onSelectOption = (option: string) => {
    console.log(option)
  }

  // TODO: update the radio group to be wrapped in a FormControl
  return (
    <div>
      <RadioGroup defaultValue="comfortable">
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="default"
            id="r1"
            onClick={(e) => console.log(e)}
          />
          <Label htmlFor="r1">Default</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="comfortable"
            id="r2"
            onClick={(e) => console.log(e)}
          />
          <Label htmlFor="r2">Comfortable</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="compact"
            id="r3"
            onClick={(e) => console.log(e)}
          />
          <Label htmlFor="r3">Compact</Label>
        </div>
      </RadioGroup>
    </div>
    // <div>
    //   <h2>{question}</h2>
    //   <ul>
    //     {answerOptions.map((option, index) => (
    //       <li key={index} onClick={() => onSelectOption(option)}>
    //         {option}
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  )
}

export default MultipleChoice
