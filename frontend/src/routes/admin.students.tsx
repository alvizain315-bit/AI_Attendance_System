import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
//import { useState } from "react";
import { Upload, UserPlus, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
//import { /*students as initial,*/ type Student } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/students")({ component: StudentsPage });

function StudentsPage() {
  const [div, setDiv] = useState<"A" | "B">("A");
  const [list, setList] = useState<any[]>([]);
  //const [list, setList] = useState<Student[]>([]);
  //const [list, setList] = useState<Student[]>(initial);
  const [q, setQ] = useState("");
  useEffect(() => {

fetch("http://127.0.0.1:5000/students")

.then(res => res.json())

/*.then(data => {
    setList(data);
})*/
.then(data => {

console.log("students data:", data);

setList(data);

})

.catch(err => {
    console.log(err);
});

}, []);
 // const filtered = list.filter((s) => s.division === div && (s.name.toLowerCase().includes(q.toLowerCase()) || s.roll.toLowerCase().includes(q.toLowerCase())));
    const filtered = list.filter((s)=>{

return (
s.division === div &&
(
s.student_name.toLowerCase().includes(q.toLowerCase())
||
s.roll_no.toString().includes(q)
)

);

});
  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) toast.success(`Imported ${f.name}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Student Management</h2>
          <p className="text-muted-foreground text-sm">Import via Excel or add students manually.</p>
        </div>
        <div className="flex gap-2">
          <label>
            <input type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={onFile} />
            <Button asChild variant="outline" className="border-primary/30">
              <span><Upload className="w-4 h-4 mr-2" /> Import Excel</span>
            </Button>
          </label>
          {/*<AddStudentDialog onAdd={(s) => setList((l) => [...l, s])} defaultDiv={div} />*/}
          <AddStudentDialog defaultDiv={div} />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex p-1 bg-muted rounded-xl">
          {(["A", "B"] as const).map((d) => (
            <button key={d} onClick={() => setDiv(d)} className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${div === d ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"}`}>
              Division {d}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-xs">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search by name or roll..." value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border/60 shadow-[var(--shadow-card)] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-left">
            <tr>
              <th className="px-5 py-3 font-semibold">Student_ID</th>
              <th className="px-5 py-3 font-semibold">Roll No</th>
              <th className="px-5 py-3 font-semibold">Name</th>
              <th className="px-5 py-3 font-semibold">Email</th>
              <th className="px-5 py-3 font-semibold">Parent Contact</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>

{filtered.map((s)=>(

<tr 
key={s.student_id}
className="border-t border-border/40 hover:bg-muted/30"
>

<td className="px-5 py-3">
{s.student_id}
</td>


<td className="px-5 py-3 font-mono font-medium text-primary">
{s.roll_no}
</td>


<td className="px-5 py-3 font-medium">
{s.student_name}
</td>


<td className="px-5 py-3 text-muted-foreground">
{s.parent_email}
</td>


<td className="px-5 py-3 text-muted-foreground">
{s.parent_contact}
</td>


<td className="px-5 py-3 text-right">

<button

onClick={()=>{

fetch(
`http://127.0.0.1:5000/students/${s.student_id}`,
{
method:"DELETE"
}
)

.then(()=>{

setList((l)=>
l.filter(
(x)=>x.student_id !== s.student_id
)
);

toast.success("Student removed");

})

}}

className="text-muted-foreground hover:text-destructive"

>

<Trash2 className="w-4 h-4"/>

</button>

</td>


</tr>

))}


{
filtered.length === 0 && (

<tr>

<td 
colSpan={6}
className="px-5 py-10 text-center text-muted-foreground"
>

No students found.

</td>

</tr>

)

}


</tbody>
        
        </table>
      </div>
    </div>
  );
}

//function AddStudentDialog({ onAdd, defaultDiv }: { onAdd: (s: Student) => void; defaultDiv: "A" | "B" }) 
  function AddStudentDialog({ defaultDiv }: { defaultDiv: "A" | "B" })   {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [div, setDiv] = useState<"A" | "B">(defaultDiv);

  const submit = () => {
    if (!name || !roll) return toast.error("Name and roll number required");
    //onAdd({ id: `s${Date.now()}`, name, roll, email, parentPhone: phone, division: div });
    fetch("http://127.0.0.1:5000/students",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

roll_no:roll,
student_name:name,
division:div,
parent_email:email,
parent_contact:phone

})

})
.then(res=>res.json())
.then(()=>{

toast.success("Student added");

window.location.reload();

});
   
    setOpen(false); setName(""); setRoll(""); setEmail(""); setPhone("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button style={{ background: "var(--gradient-primary)" }}><UserPlus className="w-4 h-4 mr-2" /> Add Manually</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Add New Student</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div><Label>Roll Number</Label><Input value={roll} onChange={(e) => setRoll(e.target.value)} /></div>
          <div><Label>Name</Label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div><Label>Email</Label><Input value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          <div><Label>Parent Phone</Label><Input value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
          <div>
            <Label>Division</Label>
            <div className="flex gap-2 mt-1.5">
              {(["A", "B"] as const).map((d) => (
                <button key={d} onClick={() => setDiv(d)} className={`flex-1 py-2 rounded-lg border ${div === d ? "border-primary bg-primary/10 text-primary" : "border-border"}`}>Division {d}</button>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={submit} style={{ background: "var(--gradient-primary)" }}>Add Student</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}