import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
});

/**
 * prompt에 대해 messages 를 입력받아 답변을 생성합니다.
 * @param messages
 * @param prompt
 * @returns
 */
export const createMessage = async (messages: string, prompt: string) => {
  const chatCompletion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo-0125',
    messages: [
      {
        role: 'system',
        content: prompt,
      },
      {
        role: 'user',
        content: messages,
      },
    ],
  });

  return {
    data: chatCompletion.choices[0].message.content,
    success: true,
    status: 200,
    message: '응답이 생성되었습니다.',
  };
};
