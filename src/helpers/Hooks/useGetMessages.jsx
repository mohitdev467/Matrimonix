import { useState, useCallback, useEffect } from "react";
import { getAllMessages } from "../../services/CommonServices/CommonServices";

const useGetMessages = (conversationId) => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  const fetchMessages = useCallback(async () => {
    if (!conversationId) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await getAllMessages(conversationId);
      setMessages(response.data);
    } catch (err) {
      setError(err?.message || "Failed to fetch messages");
    } finally {
      setIsLoading(false);
    }
  }, [conversationId]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return { fetchMessages, messages, isLoading, error, setMessages };
};

export default useGetMessages;
