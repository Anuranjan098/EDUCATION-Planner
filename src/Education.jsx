import { useState ,useRef ,useEffect} from "react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

function Education(){
    const [subject ,setSubject] = useState("");
    const [hours , setHours] = useState("");
    const [records, setRecords] = useState([]);
    const subjectInput = useRef(null);
     
    useEffect(() => {
      const storedRecords = JSON.parse(localStorage.getItem("Records"));
      if (Array.isArray(storedRecords)) {
          setRecords(storedRecords);
        }
      }, []);
    
    // Save to localStorage on change on depencyList
    useEffect(() => {
    localStorage.setItem("Records", JSON.stringify(records));
     }, [records]);

    function handleSubmit(e){
        e.preventDefault();
        const obj = {
             id : Date.now(),
             subject : subject.trim(),
             hours : parseInt(hours),
        }
        setRecords([...records , obj]);
        setHours("");
        setSubject("");
        subjectInput.current.focus();
    }
    function modifyHours(id,sign){
        setRecords(records.map(obj =>
            obj.id === id ? {...obj, hours: sign === "+" ? parseInt(obj.hours) + 1  : parseInt(obj.hours) - 1}: obj ));
    }
   
    function handleDelete(id){
          setRecords(records.filter((obj)=>(obj.id !==id)))
    }


return (
    <>
         <div className="outer">
        <div className="input">
        <h4>Geekster Education Planner</h4>
        <form onSubmit={handleSubmit}>
          <input ref={subjectInput} type="text" placeholder=" Enter Subject"  value={subject}
            onChange={(e) => setSubject(e.target.value)} required />
          <input  type="number" min={0}  placeholder=" Enter Hours" value={hours}
             onChange={(e) => setHours(e.target.value)} required/>
          <button type="submit">Add</button>
        </form>
      </div>
      <div  className="list">
       {
        records.map((obj)=>(
          <div className="sub" key={obj.id}> 
         <div><strong>{obj.subject}</strong> : {obj.hours} hrs</div>
          <div className="controls">
            <button onClick={() => modifyHours(obj.id , "+")}><FaPlus /></button>
            <button onClick={() => modifyHours(obj.id,"-")}><FaMinus /></button>
            <button onClick={() => handleDelete(obj.id)}>  <FaTrash /> </button>
          </div>
          </div>
        ))
       }

      </div>
      </div>
    </>
)
}
export default Education;