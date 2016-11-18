use std::error;
use std::fmt;

#[derive(Debug)]
pub enum XmlError {
  UnknownTag,
}

impl fmt::Display for XmlError {
  fn fmt(&self, fmt: &mut fmt::Formatter) -> fmt::Result {
    write!(fmt, "{:?}", self)
  }
}

impl error::Error for XmlError {
  fn description(&self) -> &str {
    match *self {
      XmlError::UnknownTag => "unknown MathML tag",
    }
  }
}
