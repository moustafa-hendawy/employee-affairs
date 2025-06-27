import React from 'react'

function JobNames() {
    const [jobGroups, setJobGroups] = useState([]); 
    const [jobSubGroups, setJobSubGroups] = useState([]); 
    const [selectedGroup, setSelectedGroup] = useState(null);
  return (
    <div>
   <select 
          onChange={(e) => setSelectedGroup(jobGroups.find((x) => x.id == e.target.value ))}
          value={selectedGroup ? selectedGroup.id : ''}
          name=""
          id=""
        >
          <option value="" disabled>اختر المجموعة</option>
          {jobGroups && jobGroups.map((group) => (
            <option style={{cursor: 'pointer'}} key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
   <select 
          onChange={(e) => setSelectedGroup(jobGroups.find((x) => x.id == e.target.value ))}
          value={selectedGroup ? selectedGroup.id : ''}
          name=""
          id=""
        >
          <option value="" disabled>اختر المجموعة</option>
          {jobSubGroups && jobSubGroups.map((group) => (
            <option style={{cursor: 'pointer'}} key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
    </div>
  )
}

export default JobNames
