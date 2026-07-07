import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
//import { useState } from "react";
import { Upload, UserPlus, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
//import { teachers as initial, type Teacher } from "@/lib/mock-data";
type Teacher = {
  teacher_id:number;
  teacher_name:string;
  subject:string;
  email:string;
};
import { toast } from "sonner";

export const Route = createFileRoute("/admin/teachers")({ component: TeachersPage });

function TeachersPage() {
 // const [list, setList] = useState<Teacher[]>([]);
  const [list, setList] = useState<Teacher[]>([]);/*(initial);*/
  const [q, setQ] = useState("");
  const fetchTeachers = async () => {

  try {

    const response = await fetch(
      "http://localhost:5000/teachers"
    );

    const data = await response.json();

    setList(data);


  } catch(error){

    console.log("Failed to load teachers");

  }

};


useEffect(() => {

  fetchTeachers();

}, []);
  //const filtered = list.filter((t) => t.name.toLowerCase().includes(q.toLowerCase()) || t.subject.toLowerCase().includes(q.toLowerCase()));
    const filtered = list.filter((t)=>
t.teacher_name.toLowerCase().includes(q.toLowerCase())
||
t.subject.toLowerCase().includes(q.toLowerCase())
);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) toast.success(`Imported ${f.name}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Teacher Management</h2>
          <p className="text-muted-foreground text-sm">Import via Excel or add teachers manually.</p>
        </div>
        <div className="flex gap-2">
          <label>
            <input type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={onFile} />
            <Button asChild variant="outline" className="border-primary/30"><span><Upload className="w-4 h-4 mr-2" /> Import Excel</span></Button>
          </label>
          <AddDlg  />
        </div>
      </div>

      <div className="relative max-w-xs">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search teachers..." value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((t) => (
          <div key={t.teacher_id} className="bg-card rounded-2xl p-5 border border-border/60 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-primary-foreground" style={{ background: "var(--gradient-accent)" }}>
                {t.teacher_name.split(" ").map((n) => n[0]).slice(-2).join("")}
              </div>
              <button onClick={()=>{

fetch(
`http://127.0.0.1:5000/teachers/${t.teacher_id}`,
{
method:"DELETE"
}
)

.then(()=>{

setList((l)=>
l.filter(
(x)=>x.teacher_id !== t.teacher_id
)
);

toast.success("Teacher removed");

})

}} className="text-muted-foreground hover:text-destructive">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <h3 className="font-semibold">
{t.teacher_name}
</h3>

<p className="text-sm text-accent font-medium">
{t.subject}
</p>

<p className="text-xs text-muted-foreground mt-2">
{t.email}
</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AddDlg() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(""); const [subject, setSubject] = useState(""); const [email, setEmail] = useState("");
  const submit = () => {
    //if (!name || !empId) return toast.error("Name and Emp ID required");
      if (!name)
return toast.error("Teacher name required");
    //onAdd({ id: `t${Date.now()}`, name, empId, subject, email });
    fetch(
"http://127.0.0.1:5000/teachers",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

teacher_name:name,
subject:subject,
email:email

})

}

)

.then((res)=>res.json())
.then(()=>{

toast.success("Teacher added");
setOpen(false);

window.location.reload();

})
.catch((err)=>{

console.log(err);
toast.error("Failed to add teacher");

});
  
    setOpen(false); setName(""); setSubject(""); setEmail("");
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button style={{ background: "var(--gradient-primary)" }}><UserPlus className="w-4 h-4 mr-2" /> Add Manually</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Add New Teacher</DialogTitle></DialogHeader>
        <div className="space-y-3">
          {/*<div><Label>Employee ID</Label><Input value={empId} onChange={(e) => setEmpId(e.target.value)} /></div>*/}
          <div><Label>Name</Label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div><Label>Subject</Label><Input value={subject} onChange={(e) => setSubject(e.target.value)} /></div>
          <div><Label>Email</Label><Input value={email} onChange={(e) => setEmail(e.target.value)} /></div>
        </div>
        <DialogFooter><Button onClick={submit} style={{ background: "var(--gradient-primary)" }}>Add Teacher</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}