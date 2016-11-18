use std::error;

pub type Result<T> = ::std::result::Result<T, Error>;

#[derive(Debug)]
pub enum Error {
  FormatError(Box<error::Error>),
  EndOfSource,
}

