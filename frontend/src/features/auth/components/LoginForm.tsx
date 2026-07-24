import { 
    useState 
} from "react";

import {
    Mail,
    Lock,
    Eye,
    EyeOff
} from "lucide-react";

import Input from "../../../shared/components/Input";
import Button from "../../../shared/components/Button";

import {
    login
} from "../services/authService";


import {
    useDispatch
} from "react-redux";


import {
    loginSuccess
} from "../authSlice";



export default function LoginForm(){


const dispatch = useDispatch();


const [email,setEmail] = useState("");

const [password,setPassword] = useState("");

const [showPassword,setShowPassword] = useState(false);

const [loading,setLoading] = useState(false);

const [error,setError] = useState("");




const handleSubmit = async(
    e:React.FormEvent
)=>{


e.preventDefault();


try{


setLoading(true);

setError("");



const response =
await login({

    email,

    password

});



dispatch(
    loginSuccess(response)
);



console.log(
    "Login Success",
    response
);



}
catch(error){


console.error(error);


setError(
    "Invalid email or password"
);


}
finally{


setLoading(false);


}


};




return (

<form

onSubmit={handleSubmit}

className="
space-y-5
"


>


{
error &&

<div className="
rounded-lg
bg-red-100
text-red-600
px-4
py-3
text-sm
">

{error}

</div>

}




<Input

label="Email Address"

type="email"

placeholder="Enter your email"

value={email}

onChange={
e=>setEmail(e.target.value)
}

icon={
<Mail size={18}/>
}

/>




<div className="relative">


<Input

label="Password"

type={
showPassword
?
"text"
:
"password"
}

placeholder="Enter password"

value={password}

onChange={
e=>setPassword(e.target.value)
}

icon={
<Lock size={18}/>
}

/>



<button

type="button"

onClick={()=>
setShowPassword(!showPassword)
}

className="
absolute
right-3
top-10
text-gray-400
"

>

{
showPassword
?
<EyeOff size={20}/>
:
<Eye size={20}/>
}


</button>


</div>





<Button

text="Login"

loading={loading}

/>



<div className="
flex
justify-between
text-sm
text-gray-500
">


<label className="
flex
gap-2
items-center
">

<input
type="checkbox"
/>

Remember me

</label>


<a
href="#"
className="
text-indigo-600
hover:underline
"
>

Forgot Password?

</a>


</div>



</form>

);


}