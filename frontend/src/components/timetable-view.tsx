import { UploadTimetable } from "@/components/UploadTimetable";
import { useEffect, useState } from "react";
import { Calendar, Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
//import { useEffect, useState } from "react";
//import { timetable } from "@/lib/mock-data";
import { toast } from "sonner";
type TimetableEntry = {
  timetable_id:number;
  day_name:string;
  lecture_start:string;
  lecture_end:string;
  subject:string;
  teacher_id:number;
};

//export function TimetableView(...)

export function TimetableView({ title, subtitle, editable = false }: { title: string; subtitle: string; editable?: boolean }) {
  const [div, setDiv] = useState<"A" | "B">("A");
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const [entries, setEntries] = useState<TimetableEntry[]>([]);
  const [editItem,setEditItem] = useState<TimetableEntry | null>(null);
  const [loading, setLoading] = useState(false);
  const [attendanceDuration,setAttendanceDuration] = useState(15);
  const [outDuration,setOutDuration] = useState(10);

  const fetchTimetable = async () => {

  try {

setLoading(true);


const response = await fetch(
`http://localhost:5000/timetable?division=${div}`
);


if(!response.ok){
 throw new Error("Timetable fetch failed");
}


const data = await response.json();


setEntries(data);


}
catch(error){

console.log(error);

}
finally{

setLoading(false);

}

};
 useEffect(() => {

    fetchTimetable();

  }, [div]);
  const saveAttendanceWindow = async()=>{

try{

for(const item of entries){

const response = await fetch(
"http://localhost:5000/attendance-window",
{
method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

timetable_id:item.timetable_id,

duration:attendanceDuration,

out_duration:outDuration

})

}

);


if(!response.ok){
throw new Error("Failed");
}


}


toast.success("Attendance window saved");


}
catch(error){

console.log(error);

toast.error("Failed to save window");

}

};
if(loading){
    return <p>Loading timetable...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <p className="text-muted-foreground text-sm">{subtitle}</p>
        </div>
        {editable && (
  <div className="flex flex-wrap gap-3">
 
    <UploadTimetable />
    <div className="flex items-center gap-3">

<select
className="border rounded p-2"

value={attendanceDuration}

onChange={(e)=>
setAttendanceDuration(Number(e.target.value))
}

>

<option value={5}>5 min</option>
<option value={10}>10 min</option>
<option value={15}>15 min</option>
<option value={20}>20 min</option>

</select>

<select

className="border rounded p-2"

value={outDuration}

onChange={(e)=>
setOutDuration(Number(e.target.value))
}

>

<option value={5}>Out 5 min</option>
<option value={10}>Out 10 min</option>
<option value={15}>Out 15 min</option>

</select>



<Button
onClick={saveAttendanceWindow}
>
Save Window
</Button>


</div>


  </div>
)}
      
  </div>   
      <div className="flex p-1 bg-muted rounded-xl w-fit">
        {(["A", "B"] as const).map((d) => (
          <button key={d} onClick={() => setDiv(d)} className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${div === d ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"}`}>
            Division {d}
          </button>
        ))}
      </div>

      {/*<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {days.map((day) => {
          //const items = entries.filter((e) => e.day === day);
          const items = entries.filter(
(e)=> e.day_name === day
);
          return (
            <div key={day} className="bg-card rounded-2xl border border-border/60 shadow-[var(--shadow-card)] overflow-hidden">
              <div className="px-4 py-3 border-b border-border/60 flex items-center gap-2" style={{ background: "var(--gradient-subtle)" }}>
                <Calendar className="w-4 h-4 text-primary" />
                <span className="font-semibold">{day}</span>
              </div>
              <div className="p-3 space-y-2 min-h-[200px]">
                {items.length === 0 && <p className="text-xs text-muted-foreground text-center py-6">No lectures</p>}
                {/*{items.map((it, i) => (
                  <div key={i}*/}
                 {/*} {items.map((it) => (
                    <div key={it.timetable_id} className="relative p-3 rounded-lg border-l-4 bg-muted/40" style={{ borderLeftColor: i % 2 ? "oklch(0.72 0.16 35)" : "oklch(0.52 0.11 195)" }}>*/}
                    {items.map((it,i) => (
<div 
key={it.timetable_id} 
className="relative p-3 rounded-lg border-l-4 bg-muted/40" 
style={{ 
borderLeftColor: i % 2 ? 
"oklch(0.72 0.16 35)" : 
"oklch(0.52 0.11 195)" 
}}
>
                    <button
className="absolute top-2 right-2"
onClick={() => setEditItem(it)}
>
<Pencil className="w-4 h-4"/>
</button>
                    <div className="text-xs font-mono text-muted-foreground">{it.lecture_start} - {it.lecture_end}</div>
                    <div className="font-semibold text-sm mt-0.5">{it.subject}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Teacher ID: {it.teacher_id}{/*{it.teacher}*/}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {editItem && (

<div className="fixed inset-0 bg-black/40 flex items-center justify-center">

<div className="bg-white p-6 rounded-xl space-y-3">


<h2 className="font-bold">
Edit Lecture
</h2>


<input
className="border p-2 rounded w-full"
value={editItem.subject}
onChange={(e)=>
setEditItem({
...editItem,
subject:e.target.value
})
}
/>

<input
className="border p-2 rounded w-full"
value={editItem.teacher_id}
onChange={(e)=>
setEditItem({
...editItem,
teacher_id:Number(e.target.value)
})
}
/>


<input
value={editItem.lecture_start}
onChange={(e)=>
setEditItem({
...editItem,
lecture_start:e.target.value
})
}
/>

<input
value={editItem.lecture_end}
onChange={(e)=>
setEditItem({
...editItem,
lecture_end:e.target.value
})
}
/>



<button
onClick={async()=>{


{/*await fetch(
`http://localhost:5000/timetable/${editItem.timetable_id}`,
{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(editItem)
}
);*/}
const response = await fetch(
`http://localhost:5000/timetable/${editItem.timetable_id}`,
{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(editItem)
}
);


if(response.ok){
toast.success("Timetable updated");
setEditItem(null);
fetchTimetable();
}
else{
toast.error("Update failed");
}

}}
>
Save
</button>

<button
onClick={()=>setEditItem(null)}
>
Cancel
</button>

</div>

</div>

)}
    </div>
  );
}