import {render,  screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TransactionCreateStepTwo from './TransactionCreateStepTwo'

//unit test (test small part of the appliocation)
test('check if pay button is disabled on page load', async ()=>{
    render(<TransactionCreateStepTwo sender={{id:'4'}} receiver={{id:'5'}}/>)

    // screen.debug()
    expect(await screen.findByRole('button', {name:'Pay'})).toBeDisabled()
} )

//unit test
test('if amount and note is supplied, pay button becomes enabled', ()=>{
    render(<TransactionCreateStepTwo sender={{id:'4'}} receiver={{id:'5'}}/>)
    
    userEvent.type(screen.getByPlaceholderText(/amount/i),'400')
    userEvent.type(screen.getByPlaceholderText(/add a note/i),'for dinner')

    expect(screen.getByRole('button',{name:/pay/i})).toBeEnabled()
    // screen.getByRole('')
})

//combining the unit test to form an integration test
//when user comes to the payment part, they see the button disabled, then 
//..enable it by filling the inputs fields

test('disabled at first, then enable when user fills the inputs field', async()=>{
    render(<TransactionCreateStepTwo sender={{id: '4'}} receiver={{id: '5'}}/>)

    expect(await screen.findByRole('button',{name:/pay/i})).toBeDisabled()

    //the user types
    userEvent.type(screen.getByPlaceholderText(/amount/i), '400')
    userEvent.type(screen.getByPlaceholderText(/add a note/i), 'for lunch')

    expect( await screen.findByRole('button',{name:/pay/i})).toBeEnabled()
})