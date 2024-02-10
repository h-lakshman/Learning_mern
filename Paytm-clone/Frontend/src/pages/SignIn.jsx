import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import { Button } from '../components/Button'
import { ButtonWarning } from '../components/ButtonWarning'
export const SignIn = () => {
  return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center" >
      <div className='bg-white text-center w-80 rounded-lg p-2  px-4'>
        <Heading label={'Sign In'} className='text-sm font-medium pt-4 ' />
        <SubHeading label={'Enter your credentials to to access your account'} />
        <InputBox label={'Email'} placeholder='vaibhav@gmail.com' />
        <InputBox label={'Password'} placeholder='123456' />
        <div className='pt-4'>
          <Button label='SignIn' />
        </div>
        <ButtonWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>

  </div>
}
