import GoogleAuth from '@/PageComponents/GoogleAuth'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

type FormFields = {
    username: string, 
    password: string
}

const Login = () => {
    const [message, setMessage] = useState<string>('')
    const form = useForm<FormFields>()
    
    const onSubmit: SubmitHandler<FormFields> = async (data) =>  {
        try {
            if(!data.username || !data.password) return setMessage("please fill in the form")

            const res: Response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(data),
                credentials: 'include'
            })
            
            const fetchdata = await res.json()

            if (fetchdata?.error) throw new Error(fetchdata.error)

            if (fetchdata.user) return window.location.assign('http://localhost:5173');
        } catch (error: any) {
            setMessage("wrong useranme or password")
        }
    }

    useEffect(() => {
        if(!message) return
        setTimeout(() => {
            setMessage("")
        }, 2000);
    }, [message])

    return (
        <div className='h-screen flex justify-center items-center'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-[400px] space-y-6 p-5 
                rounded-md border border-slate-50 shadow-xl bg-slate-50">
                    <h2 className='font-bold text-3xl'>Login</h2>
                    <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input type='text' placeholder="username" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type='password' placeholder="password" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                    />
                    {
                    message ? <FormMessage>{message}</FormMessage> : 
                    <p className='font-semibold text-sm'>Don't have an account? <Link className='underline text-blue-600' to={'/signup'}>SignUp</Link></p>
                    }
                    <div className='flex flex-col gap-2 px-4'>
                        <div className='flex justify-center'>
                            <Button type='submit' className='w-[250px]' size={'lg'}>Submit</Button>
                        </div>
                        <div className='divider'>or</div>
                        <GoogleAuth />
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default Login