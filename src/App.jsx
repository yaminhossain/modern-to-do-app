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

const tags = [
  { tagName: "HTML", backgroundColor: "bg-amber-400" },
  { tagName: "CSS", backgroundColor: "bg-indigo-400" },
  { tagName: "JavaScript", backgroundColor: "bg-cyan-400" },
  { tagName: "React", backgroundColor: "bg-emerald-400" },
];

const App = () => {
  //shadCN UI state
  const [isOpen, setIsOpen] = useState(false);
  // active tags
  const [activeTag, setActiveTag] = useState([]);
  console.log("Active Tags", activeTag);

  const activeTagHandler = (tagName) => {
    const exists = activeTag.filter((t) => t === tagName);

    if (exists) {
      const nonActiveTags = activeTag.filter((t) => t !== tagName);
      setActiveTag(nonActiveTags);
    } else {
      setActiveTag([...activeTag, exists]);
    }
  };

  return (
    <main className="flex flex-col gap-4 items-center my-5">
      <Input className={"w-1/5"} placeholder="Enter the name of your task" />
      <div className="w-1/3 flex justify-between items-end">
        <div>
          <p className="font-semibold">Tags: </p>
          {tags.map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className={`me-2 ${(tag.tagName === activeTag[tag.tagName]) && tag.backgroundColor} cursor-pointer`}
              onClick={() => activeTagHandler(tag.tagName)}
            >
              {tag.tagName}
            </Badge>
          ))}
        </div>
        <div className="flex gap-3">
          <DropdownMenu onOpenChange={() => setIsOpen(!isOpen)}>
            <DropdownMenuTrigger asChild>
              <Button variant={"outline"}>
                Task type
                <ChevronDown className={`${isOpen && "rotate-180"}`} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>To Do</DropdownMenuItem>
              <DropdownMenuItem>Doing</DropdownMenuItem>
              <DropdownMenuItem>Done</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant={"default"}>
            <Plus />
            Add Task
          </Button>
        </div>
      </div>
      <hr className="border-1 w-full" />
      <div className="grid grid-cols-3 gap-4 w-5xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold">🎯To do</h1>
          <Card className="w-full max-w-sm mt-4">
            <CardContent>hi</CardContent>
          </Card>
        </div>
        <div>
          <h1 className="text-3xl font-bold">🌟Doing</h1>
          <Card className="w-full max-w-sm mt-4">
            <CardContent>hi</CardContent>
          </Card>
        </div>
        <div>
          <h1 className="text-3xl font-bold">✅Done</h1>
          <div>
            <Card className="w-full max-w-sm mt-4">
              <CardContent>hi</CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
