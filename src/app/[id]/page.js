import axiosInstance from "@/app/utils/axios.interceptor";
import Home from ".";

export default async function SurveyApp({ params }) {
  const { id } = await params;
  let seq = [];
  let question = [];

  try {
    const responseSeq = await axiosInstance.get(`/sequences/${id}`);
    if (responseSeq.data.status !== "INACTIVE" || responseSeq.data?.length) {
      const responseQuestion = await axiosInstance.get(`/questions/${id}`);
      question = responseQuestion.data.data?.content?.length ? responseQuestion.data.data.content : [];
    }
    seq = responseSeq.data;
    
    
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  return (
    <>
      <Home dataSeq={seq} dataQuestions={question} />
    </>
  );
}
