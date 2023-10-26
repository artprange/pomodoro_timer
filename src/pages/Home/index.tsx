import { useState, createContext } from 'react'
import { HandPalm, Play } from 'phosphor-react'

import {
  HomeContainer,
  StopCountDownButton,
  StartCountDownButton,
} from './styles'
import { NewCycleForm } from './components/NewCycleForm'
import { CountDown } from './components/CountDown'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { FormProvider, useForm } from 'react-hook-form'





const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(3, 'Informe a tarefa'), 
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo deve ter no mínimo 1 minuto')
    .max(60, 'O ciclo deve ter no máximo 60 minutos'),
})

type NewCycleFormData = Zod.infer<typeof newCycleFormValidationSchema>



export function Home() {
  

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm


  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreteNewCycle)} action="">

        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <CountDown />

        {activeCycle ? (
          <StopCountDownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            Parar
          </StopCountDownButton>
        ) : (
          <StartCountDownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}
