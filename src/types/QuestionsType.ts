export type QuestionsType = {
category: string
difficulty: 'easy' | 'medium' | 'hard'
type: 'boolean' | 'multiple'
correct_answer: string
incorrect_answers: string[]
question: string

}