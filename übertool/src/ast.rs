//! The abstract source tree for maths expressions.

/// A symbol.
#[derive(Debug)]
pub enum Symbol {
  /// A generic identifier which has not (yet) been resolved into a more
  /// specific one.
  Identifier(String),
  /// Name for an object with a set of properties but no fixed value.
  Variable(String),
  /// Name for an object with both a set of properties and a fixed value.
  Constant(String),
}

/// The abstract source tree for maths expressions.
#[derive(Debug)]
pub enum Node {
  /// A symbol.
  Symbol(Symbol),
}
