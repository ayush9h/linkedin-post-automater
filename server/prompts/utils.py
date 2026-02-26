def is_termination_message(msg):
    """
    Determines if the given message indicates termination.

    Args:
        msg (dict): The message to check.

    Returns:
        bool: True if the message ends with "TERMINATE", otherwise False.
    """
    if isinstance(msg.get("content"), str):
        return msg["content"].rstrip().endswith("TERMINATE")
    elif isinstance(msg.get("content"), list):
        for content in msg["content"]:
            if isinstance(content, dict) and "text" in content:
                return content["text"].rstrip().endswith("TERMINATE")
    return False
