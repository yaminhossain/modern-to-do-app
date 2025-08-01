import React, { useState } from "react";

import { Input } from "./components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, Plus } from "lucide-react";

//Tags names and colors
const tags = [
  { tagName: "HTML", backgroundColor: "bg-amber-400" },
  { tagName: "CSS", backgroundColor: "bg-indigo-400" },
  { tagName: "JavaScript", backgroundColor: "bg-cyan-400" },
  { tagName: "React", backgroundColor: "bg-emerald-400" },
];

//Task options
const taskOptions = [
  { value: "todo", label: "To Do" },
  { value: "doing", label: "Doing" },
  { value: "done", label: "Done" },
];

const App = () => {
  const [displayItems, setDisplayItems] = useState([]);
  console.log(displayItems);

  //shadCN UI states
  const [isOpen, setIsOpen] = useState(false); //controls dropdown opening and closing state

  // active tags
  const [activeTags, setActiveTags] = useState([]);

  //selected task type state for showing selected task
  const [selectedTaskType, setSelectedTaskType] = useState("");

  //input field values
  const [inputFieldValue, setInputFieldValue] = useState("");

  const activeTagHandler = (tagName) => {
    const isTagNameExists = activeTags.find((t) => tagName === t);
    if (!isTagNameExists) {
      setActiveTags([...activeTags, tagName]);
    } else {
      const notMatchedTags = activeTags.filter((t) => t !== tagName);
      setActiveTags(notMatchedTags);
    }
  };

  const inputValueHandle = (e) => {
    setInputFieldValue(e.target.value);
  };

  const addTaskToMenu = () => {
    const displayValues = { inputFieldValue, activeTags, selectedTaskType };
    if ((inputFieldValue, activeTags, selectedTaskType)) {
      setDisplayItems((prevValue) => [...prevValue, displayValues]);
      setInputFieldValue("");
      setActiveTags([]);
      setSelectedTaskType("");
    }
  };

  return (
    <main className="flex flex-col gap-4 items-center my-5">
      <Input
        className={"w-1/5"}
        placeholder="Enter the name of your task"
        onChange={inputValueHandle}
        value={inputFieldValue}
      />
      <div className="w-1/3 flex justify-between items-end">
        {/* Tag selection section */}
        <div>
          <p className="font-semibold">Select Tags: </p>
          {tags.map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className={`me-2 ${
                activeTags.includes(tag.tagName) ? tag.backgroundColor : ""
              } cursor-pointer`}
              onClick={() => activeTagHandler(tag.tagName)}
            >
              {tag.tagName}
            </Badge>
          ))}
        </div>

        <div className="flex gap-3">
          {/* Type of tasks */}
          <DropdownMenu onOpenChange={() => setIsOpen(!isOpen)}>
            <DropdownMenuTrigger asChild>
              <Button variant={"outline"}>
                {selectedTaskType ? selectedTaskType : "Task type"}
                <ChevronDown className={`${isOpen && "rotate-180"}`} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {taskOptions.map((taskOption) => (
                <DropdownMenuItem
                  key={taskOption.value}
                  onClick={() => setSelectedTaskType(taskOption.label)}
                >
                  {taskOption.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Add Tasks Button */}
          <Button variant={"default"} onClick={addTaskToMenu}>
            <Plus />
            Add Task
          </Button>
        </div>
      </div>
      <hr className="border-1 w-full" />

      {/* Displaying Items to the UI */}
      <div className="grid grid-cols-3 gap-4 w-5xl mx-auto">
        {/* To Do Section */}
        <div>
          <h1 className="text-3xl font-bold">🎯To do</h1>
          {displayItems.map(
            (singleItem, index) =>
              singleItem.selectedTaskType === "To Do" && (
                <Card className="w-full max-w-sm mt-4" key={index}>
                  <CardContent>
                    <h2 className="text-xl">{singleItem?.inputFieldValue}</h2>
                  </CardContent>
                </Card>
              )
          )}
        </div>

        {/* Doing section */}
        <div>
          <h1 className="text-3xl font-bold">🌟Doing</h1>
          {displayItems.map(
            (singleItem, index) =>
              singleItem.selectedTaskType === "Doing" && (
                <Card className="w-full max-w-sm mt-4" key={index}>
                  <CardContent>
                    <h2 className="text-xl">{singleItem?.inputFieldValue}</h2>
                  </CardContent>
                </Card>
              )
          )}
        </div>

        {/* Done section */}
        <div>
          <h1 className="text-3xl font-bold">🌟✅Done</h1>
          {displayItems.map(
            (singleItem, index) =>
              singleItem.selectedTaskType === "Done" && (
                <Card className="w-full max-w-sm mt-4" key={index}>
                  <CardContent>
                    <h2 className="text-xl">{singleItem?.inputFieldValue}</h2>
                  </CardContent>
                </Card>
              )
          )}
        </div>
      </div>
    </main>
  );
};

export default App;
