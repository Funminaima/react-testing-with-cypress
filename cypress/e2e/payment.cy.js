// const { cy } =require("date-fns/locale")

describe('payment',()=>{
  it('user can make payment', ()=>{
      //user can login
      cy.visit('localhost:3000')
      cy.findByRole('textbox', {  name: /username/i}).type('johndoe')
      cy.findByLabelText(/password/i).type('s3cret')
      cy.findByRole('checkbox', {name:/remember me/i}).check()
      cy.findByRole('button', {name:/sign in/i}).click()

      //check account balance
      let oldBalance;
      cy.get('[data-test="sidenav-user-balance"]').then(balance=>oldBalance=balance.text()).then(balance=>console.log(balance))

      //click on new button
      cy.findByRole('button', {name:/new/i}).click()

      //search users
      cy.findByRole('textbox').type('Arely Kertzmann')
      cy.findByText(/arely kertzmann/i).click()

      //add payment and note then click pay
      const payment='400.00'
      cy.findByPlaceholderText(/amount/i).type(payment)
      const note=Math.random().toString(16).slice(2)
      cy.findByPlaceholderText(/add a note/i).type(note)
      cy.findByRole('button', {name:/pay/i}).click()
      //return to transaction
      cy.findByRole('button', {name:/return to transactions/i}).click()

      //go to personal payment
      cy.findByRole('tab', {  name: /mine/i}).click()

      //click on payment
      cy.findByText(note).click({force:true})

      //verify if payment was made
      cy.findByText(`-$${payment}`).should('be.visible')
      cy.findByText(note).should('be.visible')

      // verify if payment amount was deducted 
      cy.get('[data-test="sidenav-user-balance"]').then(balance=>{
        //remove the $ sign from both old and new balance
        const convertedOldBal=parseFloat(oldBalance.replace(/\$|,/g ,""))
        const convertedNewBal=parseFloat(balance.text().replace(/\$|,/g ,""))
        expect(convertedOldBal - convertedNewBal).to.equal(parseFloat(payment))
      })
  })
})